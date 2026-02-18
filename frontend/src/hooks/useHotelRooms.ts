import { useState, useEffect } from "react";
import { getHotelRoomsByHotelId } from "../api/HotelApi";

export const useHotelRooms = (hotelId: string) => {
    const [hotelRooms, setHotelRooms] = useState<any>([]);
    useEffect(() => {
        const fetchHotelRooms = async () => {
            try {
                const rooms = await getHotelRoomsByHotelId(hotelId);
                setHotelRooms(rooms);
            } catch (error) {
                console.error("Error fetching hotel rooms:", error);
            }
        };

        fetchHotelRooms();
    }, [hotelId]);

    return { hotelRooms };
};
