import { Request, Response } from "express";
import { createRoomReservation } from "./roomReservationServices";

export const createRoomReservationController = async (req: Request, res: Response) => {
    try{
        const { roomId, userId, startDate, endDate, status } = req.body;
        if (!roomId || !userId || !startDate || !endDate) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const reservation = await createRoomReservation({
            roomId: Number(roomId),
            userId: Number(userId),
            checkInDate: new Date(startDate),
            checkOutDate: new Date(endDate),
            status: status || 'confirmed',
        });
        res.status(201).json(reservation);
    } catch (error) {
        console.error("Error creating room reservation:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}