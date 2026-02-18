
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


interface Hotel {
    id: string;
    name: string;
    location: string;
    phone: string;
    email: string;
    rating?: number;
    hotel_images?: string[];
    amenities?: string[];
}

export interface HotelState {
  hotel: Hotel[];
}

const initialState: HotelState = {
  hotel: [],
};

const hotelSlice = createSlice({
  name: 'hotel',
  initialState,
  reducers: {
    setHotels(state, action: PayloadAction<any[]>) {
      // Map amenities and hotel_images from array of objects to array of strings
      state.hotel = action.payload.map(hotel => ({
        ...hotel,
        amenities: Array.isArray(hotel.amenities)
          ? hotel.amenities.map((a: any) => typeof a === 'string' ? a : a.name)
          : [],
        hotel_images: Array.isArray(hotel.hotel_images)
          ? hotel.hotel_images.map((img: any) => typeof img === 'string' ? img : img.url)
          : [],
      }));
    },
    clearHotels(state) {
      state.hotel = [];
    }
  },
});

export const { setHotels, clearHotels } = hotelSlice.actions;
export default hotelSlice.reducer;