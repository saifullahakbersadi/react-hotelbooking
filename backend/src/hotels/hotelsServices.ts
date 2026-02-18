import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getHotels = async () => {
  return await prisma.hotel.findMany({
    include: {
      amenities: true,
      hotel_images: true,
    },
  });
};

export const searchHotelsService = async (location: string, checkInDate: Date, checkOutDate: Date, guests: number) => {
  // Find hotels in location with at least one available room for the date range
  const hotels = await prisma.hotel.findMany({
    where: {
      location: {
        contains: location
      },
      rooms: {
        some: {
          capacity: { gte: guests },
          bookings: {
            none: {
              checkIn: { lte: checkOutDate },
              checkOut: { gte: checkInDate },
            }
          }
        }
      }
    },
    include: {
      amenities: true,
      hotel_images: true,
      rooms: {
        include: {
          room_images: true,
          room_amenities: true,
        },
      },
    },
  });
  return hotels;
}
