import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface HotelRoom {
    id: string;
    type: string;
    price: number;
    availability: boolean;
    hotel_id: string;
    hotel?: {
        id: string;
        name: string;
        location: string;
        image: string;
        rating?: number;
        phone: string;
        email: string;
        amenities?: string[];
        hotel_images?: string[];
    }; // Include related hotel data in the state
    room_images?: string[];
    roomAmenity?: string[];
    description?: string;
    capacity?: number;
    features?: string;
    available_from?: string;
    available_to?: string;
}

export interface HotelRoomsState {
    hotelRooms: HotelRoom[];
}

const initialState: HotelRoomsState = {
    hotelRooms: [],
};

const hotelRoomsSlice = createSlice({
    name: 'hotelRooms',
    initialState,
    reducers:{
        setHotelRooms(state, action: PayloadAction<HotelRoom[]>){
            state.hotelRooms = action.payload;
        },
        clearHotelRooms(state){
            state.hotelRooms = [];
        } 
    }
})

export const { setHotelRooms, clearHotelRooms } = hotelRoomsSlice.actions;

export default hotelRoomsSlice.reducer;