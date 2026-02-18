import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type CreateRoomReservationParams = {
    userId: number;
    roomId: number;
    checkInDate: Date;
    checkOutDate: Date;
    status: string;
}

export const createRoomReservation = async (data: CreateRoomReservationParams) => {

    try {
        const roomReservation = await prisma.booking.create({
            data: {
                userId: data.userId,
                roomId: data.roomId,
                checkIn: data.checkInDate,
                checkOut: data.checkOutDate,
                status: data.status || 'confirmed',
            }
        });
        return roomReservation;
    } catch (error) {
        console.error("Error creating room reservation:", error);
        throw error;
    }
}