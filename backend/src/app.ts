import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import hotelRoutes from './hotels/hotelsRouter';
import hotelRoomRoutes from './hotelRooms/hotelRoomRouter';
import roomReservationRoutes from './roomReservation/roomReservationRouter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

dotenv.config();
const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(bodyParser.json());


// Or restrict to your React app
// app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json());

app.use('/hotels', hotelRoutes);
app.use('/hotels/:hotelId/rooms', hotelRoomRoutes);
app.use('/reservations', roomReservationRoutes);
app.use(express.json());

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (!email || !password) {
        console.log('Missing email or password');
        return res.status(400).json({ error: 'Email and password are required' });
    }
    try {
        if (existingUser) {
            console.log('User already exists:', email);
            return res.status(409).json({ error: 'User already exists' });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await prisma.user.create({
                data: { username, email, password: hashedPassword },
            });

            // Here you would typically save the user to your database
            console.log('Registered user:', user);
            return res.status(201).json({ message: 'User registered successfully', user });
        }
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    const user = await prisma.user.findUnique({where: { email }});
    if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({error: 'Invalid credentials'});
    }
    const token = jwt.sign({ userId: user.id , email: user.email, userName: user.username, role: user.role}, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    console.log('User logged in:', user);
    console.log('Generated JWT token:', token);
    return res.status(200).json({ message: 'Login successful', token });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
