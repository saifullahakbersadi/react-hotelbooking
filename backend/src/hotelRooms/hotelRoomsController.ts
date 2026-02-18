import { Request, Response } from "express";
import { getHotelRoomsByHotelId, getAvailableRoomsByHotelId } from "./hotelRoomServices";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Get available rooms for a hotel in a date range
export const fetchAvailableRooms = async (req: Request, res: Response) => {
  const hotelId = req.params.hotelId;
  const { startDate, endDate } = req.query;
  if (!hotelId || !startDate || !endDate) {
    return res.status(400).json({ error: "Missing required parameters" });
  }
  try {
    const availableRooms = await getAvailableRoomsByHotelId(
      hotelId,
      new Date(startDate as string),
      new Date(endDate as string)
    );
    res.status(200).json(availableRooms);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch available rooms" });
  }
};

//Get hotel rooms by hotel ID
export const fetchHotelRooms = async (req: Request, res: Response) => {
  const hotelId = req.params.hotelId;
  try {
    const hotelRooms = await getHotelRoomsByHotelId(hotelId || "");
    res.status(200).json(hotelRooms);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotel rooms by hotel ID" });
  }
};

// List all hotels rooms (for debugging)
export const getAllHotelRooms = async (req: Request, res: Response) => {
  try {
    const hotelRooms = await prisma.room.findMany({ include: 
        { 
            hotel: true, 
            room_images: true 
        } 
    });
    res.status(200).json(hotelRooms);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch all hotel rooms" });
  }
};
