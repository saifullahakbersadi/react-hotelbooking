
import { configureStore } from '@reduxjs/toolkit';
import hotelReducer from './hotelSlice';
import hotelBookingReducer from './hotelBookingSlice';
import hotelRoomReducer from './hotelRoomsSlice';


// Load persisted state from localStorage (hotel and hotelBooking)
function loadState() {
  try {
    const serializedState = localStorage.getItem('hotelState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}

// Save state to localStorage (hotel and hotelBooking)
function saveState(state: any) {
  try {
    const serializedState = JSON.stringify({
      hotel: state.hotel,
      hotelBooking: state.hotelBooking,
      hotelRoom: state.hotelRoom
    });
    localStorage.setItem('hotelState', serializedState);
  } catch {
    // ignore write errors
  }
}


export const store = configureStore({
  reducer: {
    hotel: hotelReducer,
    hotelBooking: hotelBookingReducer, // Added hotelBooking slice
    hotelRoom: hotelRoomReducer
  },
  preloadedState: loadState(),
});

// Subscribe to store changes and persist hotel and hotelBooking state
store.subscribe(() => {
  saveState({
    hotel: store.getState().hotel,
    hotelBooking: store.getState().hotelBooking,
    hotelRoom: store.getState().hotelRoom
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;