import { useEffect, useState } from "react";
import { searchHotels } from "../api/HotelApi";

export const useSearchHotels = (location:string, checkIn:Date, checkOut:Date, guests:number) => {
    const [searchedHotels, setSearchedHotels] = useState<any>([]);
    useEffect(() => {
        const fetchSearchedHotels = async () => {
            try {
                const hotelData = await searchHotels(location, checkIn, checkOut, guests);
                setSearchedHotels(hotelData);
            } catch (error) {
                console.error("Error fetching searched hotels:", error);
            }
        };

        fetchSearchedHotels();

    }, [location, checkIn, checkOut]);

    return { searchedHotels };
};