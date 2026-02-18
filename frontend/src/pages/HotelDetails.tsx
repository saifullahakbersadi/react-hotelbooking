import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import type { HotelState } from '../store/hotelSlice';
import HotelDetailsCard from '../component/molecules/HotelDetailsCard';

function HotelDetails() {
  const hotel = useSelector((state: RootState) => (state.hotel as HotelState).hotel[0]);

  if (!hotel) {
    return <Typography>No hotel data found.</Typography>;
  }

  return (
    <HotelDetailsCard hotel={hotel} />
  );
}

export default HotelDetails;
