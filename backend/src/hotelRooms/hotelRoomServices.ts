
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Get hotel rooms by hotel_id
export const getHotelRoomsByHotelId = async (hotel_id: string) => {
  return await prisma.room.findMany({
    where: { hotelId: Number(hotel_id) },
    include: {
      hotel: true,
      room_images: true,
      room_amenities: true
    },
  });
}

// Get available rooms for a hotel in a date range
export const getAvailableRoomsByHotelId = async (hotelId: string, startDate: Date, endDate: Date) => {
  // Get all rooms for the hotel
  const rooms = await prisma.room.findMany({
    where: { hotelId: Number(hotelId) },
    include: {
      hotel: true,
      room_images: true,
      room_amenities: true
    },
  });

  // Get all bookings for these rooms that overlap with the date range
  const roomIds = rooms.map(r => r.id);
  const bookings = await prisma.booking.findMany({
    where: {
      roomId: { in: roomIds },
      OR: [
        {
          checkIn: { lte: endDate },
          checkOut: { gte: startDate },
        },
        {
          checkIn: { lte: startDate },
          checkOut: { gte: endDate },
        },
      ],
    },
    select: { roomId: true },
  });
  const bookedRoomIds = new Set(bookings.map(b => b.roomId));
  // Return rooms that are not booked in the range
  return rooms.filter(r => !bookedRoomIds.has(r.id));
};