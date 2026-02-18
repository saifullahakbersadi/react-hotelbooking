import { Router } from "express";
import { fetchHotelRooms, getAllHotelRooms, fetchAvailableRooms } from "./hotelRoomsController";

const router = Router({ mergeParams: true });

// GET /hotels/:hotelId/hotelRooms
import { Request, Response } from "express";


// GET /hotels/:hotelId/rooms
router.get("/", (req: Request<{ hotelId?: string }>, res: Response) => {
	const hotelId = req.params.hotelId;
	if (hotelId) {
		return fetchHotelRooms(req, res);
	}
	return getAllHotelRooms(req, res);
});

// GET /hotels/:hotelId/rooms/available-rooms?startDate=...&endDate=...
router.get("/available-rooms", fetchAvailableRooms);

export default router;