
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


async function main() {

  
  // Delete in correct order to avoid foreign key constraint errors
  await prisma.payment.deleteMany();
  await prisma.guest.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.roomAmenity.deleteMany();
  await prisma.roomImage.deleteMany();
  await prisma.room.deleteMany();
  await prisma.amenity.deleteMany();
  await prisma.hotelImage.deleteMany();
  await prisma.hotel.deleteMany();
  await prisma.user.deleteMany();
  // Create Users
  const user1 = await prisma.user.create({
    data: {
      username: 'john_doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'user',
    },
  });
  const user2 = await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@example.com',
      password: 'adminpass',
      role: 'admin',
    },
  });

  // Add 18 more hotels (for a total of 20) with real Unsplash images
  const hotelImages = [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80',
  ];
  const roomImages = [
    'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
  ];
  const country = [
    'USA',
    'Canada',
    'UK',
    'Australia',
    'Germany',
    'France',
    'Italy',
    'Spain',
    'Japan',
    'China',
    'India',
    'Brazil',
    'Mexico',
  ];
  for (let i = 3; i <= 20; i++) {
    const hotel = await prisma.hotel.create({
      data: {
        name: `Sample Hotel ${i}`,
        location: `${100 + i} Example Rd, City${i}, ${country[i % country.length]}`,
        rating: 3.5 + (i % 2),
        phone: `+1-555-30${i}0`,
        email: `sample${i}@example.com`,
        amenities: {
          create: [
            { name: 'WiFi' },
            { name: 'Breakfast' },
            { name: i % 2 === 0 ? 'Pool' : 'Parking' },
          ],
        },
        hotel_images: {
          create: [
            { url: hotelImages[(i-3) % hotelImages.length] },
          ],
        },
      },
    });
    // Add 2 rooms for each hotel
    for (let r = 1; r <= 2; r++) {
      await prisma.room.create({
        data: {
          hotelId: hotel.id,
          roomNumber: `${i}0${r}`,
          type: r === 1 ? 'Standard' : 'Suite',
          price: 100 + i * 10 + r * 20,
          capacity: r + 1,
          availability: true,
          room_images: {
            create: [
              { url: roomImages[(i + r) % roomImages.length] },
            ],
          },
          room_amenities: {
            create: [
              { name: 'WiFi' },
              { name: r === 1 ? 'Balcony' : 'Bathtub' },
            ],
          },
        },
      });
    }
  }

  // Create Hotels
  const hotel1 = await prisma.hotel.create({
    data: {
      name: 'Grand Palace Hotel',
      location: '123 Main St, New York, USA',
      rating: 4.5,
      phone: '+1-555-1001',
      email: 'grandpalace@example.com',
      amenities: {
        create: [
          { name: 'Pool' },
          { name: 'WiFi' },
          { name: 'Gym' },
        ],
      },
      hotel_images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80' },
        ],
      },
    },
  });

  const hotel2 = await prisma.hotel.create({
    data: {
      name: 'Sunset Resort',
      location: '456 Beach Ave, Miami, USA',
      rating: 4.2,
      phone: '+1-555-2002',
      email: 'sunsetresort@example.com',
      amenities: {
        create: [
          { name: 'Beach' },
          { name: 'WiFi' },
          { name: 'Bar' },
        ],
      },
      hotel_images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80' },
        ],
      },
    },
  });

  // Create Rooms for hotel2
  await prisma.room.create({
    data: {
      hotelId: hotel2.id,
      roomNumber: '201',
      type: 'Standard',
      price: 120.0,
      capacity: 2,
      availability: true,
      room_images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80' },
        ],
      },
      room_amenities: {
        create: [
          { name: 'WiFi' },
          { name: 'Balcony' },
        ],
      },
    },
  });
  await prisma.room.create({
    data: {
      hotelId: hotel2.id,
      roomNumber: '202',
      type: 'Family',
      price: 180.0,
      capacity: 4,
      availability: true,
      room_images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80' },
        ],
      },
      room_amenities: {
        create: [
          { name: 'Kitchenette' },
          { name: 'Crib' },
        ],
      },
    },
  });

  // Create Rooms for hotel1
  const room1 = await prisma.room.create({
    data: {
      hotelId: hotel1.id,
      roomNumber: '101',
      type: 'Deluxe',
      price: 200.0,
      capacity: 2,
      availability: true,
      room_images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80' },
          { url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80' },
        ],
      },
      room_amenities: {
        create: [
          { name: 'Air Conditioning' },
          { name: 'Flat Screen TV' },
        ],
      },
    },
  });
  const room2 = await prisma.room.create({
    data: {
      hotelId: hotel1.id,
      roomNumber: '102',
      type: 'Suite',
      price: 350.0,
      capacity: 4,
      availability: true,
      room_images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80' },
          { url: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80' },
        ],
      },
    },
  });

  // Create a Booking for user1 in room1
  const booking1 = await prisma.booking.create({
    data: {
      userId: user1.id,
      roomId: room1.id,
      checkIn: new Date('2025-09-10'),
      checkOut: new Date('2025-09-15'),
      status: 'confirmed',
      guests: {
        create: [
          { name: 'John Doe', age: 30 },
        ],
      },
      payment: {
        create: {
          amount: 1000.0,
          method: 'credit_card',
          status: 'paid',
        },
      },
    },
  });
}

main()
  .then(() => {
    console.log('Seed data inserted');
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    return prisma.$disconnect();
  });