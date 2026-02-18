import { Response, Request } from "express";
import { getHotels, searchHotelsService } from "./hotelsServices";

export const fetchHotels = async (req: Request, res: Response) => {
  try {
    const hotels = await getHotels();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotels" });
  }
};

export const searchHotels = async (req: Request, res: Response) => {
  const { location, checkIn, checkOut, guests } = req.query;
  console.log("Search query params:", req.query);
  if (!location || !checkIn || !checkOut || !guests) {
    return res.status(400).json({ error: "Location, check-in, check-out, and guests query parameters are required" });
  }
  try {
    const hotels = await searchHotelsService(
      location as string,
      new Date(checkIn as string),
      new Date(checkOut as string),
      Number(guests)
    );
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ error: "Failed to search hotels by location" });
  }
}
