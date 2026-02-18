import { useState } from "react";
import { createRoomReservation } from "../api/HotelApi";

type ReservationDataType = {
    userId: number;
    roomId: number;
    startDate: Date;
    endDate: Date;
    status?: string;
};
export const useCreateRoomReservation = (reservationData: ReservationDataType) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const createReservation = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const response = await createRoomReservation(
                reservationData.userId,
                reservationData.roomId,
                reservationData.startDate,
                reservationData.endDate,
                reservationData.status
            );
            if (response.ok) {
                setSuccess(true);
            } else {
                setError("Failed to create reservation");
            }
        } catch (err) {
            setError("Failed to create reservation");
        } finally {
            setLoading(false);
        }
    };

    return { createReservation, loading, error, success };
}