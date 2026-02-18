import type { RootState } from '../store/store';
import { useSelector } from 'react-redux';

function BookingConfirmation() {
  const bookingData = useSelector((state: RootState) => state.hotelBooking.bookings[0]);
  const hotelData = useSelector((state: RootState) => state.hotelRoom.hotelRooms[0]);
  return (
    <div>
        <h1>Booking Confirmation</h1>
        {bookingData ? (
            <div>
                <h2>Thank you for your booking!</h2>
                <p><strong>Hotel:</strong> {hotelData?.hotel?.name}</p>
                <p><strong>Address:</strong> {hotelData?.hotel?.location}</p>
                <p><strong>Rooms type:</strong> {hotelData?.type}</p>
                <p><strong>Room capacity:</strong> {hotelData?.capacity}</p>
                <p><strong>Special Requests:</strong> {bookingData.specialRequests}</p>
                <p>We have sent a confirmation email to {bookingData.email}.</p>
            </div>
        ) : (
            <p>No booking data available.</p>
        )}
    </div>
  )
}

export default BookingConfirmation