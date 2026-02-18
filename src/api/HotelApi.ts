import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Replace with your actual API base URL

export const getHotel = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/hotels/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw error;
  }
};
export const getHotelRoomsByHotelId = async (hotelId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/hotels/${hotelId}/rooms`);
    return response.data;
  } catch (error) {
    console.error('Error fetching hotel rooms by hotel ID:', error);
    throw error;
  }
};
export const getAllHotelRooms = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/hotelRooms`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all hotel rooms:', error);
    throw error;
  }
};

export const searchHotels = async (location: string, checkIn: Date, checkOut: Date, guests: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/hotels/search`, {
      params: {
        location,
        checkIn,
        checkOut,
        guests
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching hotels:', error);
    throw error;
  }
};

export const createRoomReservation = async (userId: number, roomId: number, checkInDate: Date, checkOutDate: Date, status?: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/reservations`, {
      userId,
      roomId,
      startDate: checkInDate,
      endDate: checkOutDate,
      status
    });
    return response.data;
  } catch (error) {
    console.error('Error creating room reservation:', error);
    throw error;
  }
};