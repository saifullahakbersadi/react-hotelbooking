import { useEffect, useState } from "react";
import { getHotel } from "../api/HotelApi";



export const useHotel = () => {
    const [hotel, setHotel] = useState<any>([]);
    useEffect(() => {
    const fetchHotel = async () => {
        try {
            const hotelData = await getHotel();
            setHotel(hotelData);
        } catch (error) {
            console.error("Error fetching hotel:", error);
        }
    };

    fetchHotel();
    
    }, [getHotel]);

    return { hotel };
}


