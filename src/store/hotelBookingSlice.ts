import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface HotelBooking {
    name: string;
    phone: string;
    email: string;
    specialRequests?: string;
}

export interface HotelBookingState {
    bookings: HotelBooking[];
}

const initialState: HotelBookingState = {
    bookings: [],
};

const hotelBookingSlice = createSlice({
    name: 'hotelBooking',
    initialState,
    reducers:{
        setHotelBookings(state, action: PayloadAction<HotelBooking[]>){
            state.bookings = action.payload;
        },
        clearHotelBookings(state){
            state.bookings = [];
        } 
    }
})

export const { setHotelBookings, clearHotelBookings } = hotelBookingSlice.actions;

export default hotelBookingSlice.reducer;