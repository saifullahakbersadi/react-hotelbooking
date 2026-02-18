
import { Link, Route, Routes } from 'react-router-dom';
import Dashboard from '../../../pages/Dashboard';
import HotelListing from '../../../pages/HotelListing';
import HotelDetails from '../../../pages/HotelDetails';
import BookingConfirmation from '../../../pages/BookingConfirmation';
import { Box, Button } from '@mui/material';
import LoginForm from '../../../pages/LoginForm';

function index() {
  return (
    <>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#d32f2f', // MUI red[700]
        boxShadow: 1,
        py: 2
      }}>
        <Button component={Link} to="/dashboard" color="inherit" variant="text" sx={{ fontWeight: 600, fontSize: 16, color: '#fff', '&:hover': { color: '#ffd6d6' } }}>
          Dashboard
        </Button>
        <Button component={Link} to="/hotels" color="inherit" variant="text" sx={{ fontWeight: 600, fontSize: 16, color: '#fff', '&:hover': { color: '#ffd6d6' } }}>
          Hotels
        </Button>
        <Button component={Link} to="/login" color="inherit" variant="text" sx={{ fontWeight: 600, fontSize: 16, color: '#fff', '&:hover': { color: '#ffd6d6' } }}>
          Login
        </Button>
      </Box>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/hotels" element={<HotelListing />} />
        <Route path="/hotel-details" element={<HotelDetails />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </>
  );
}

export default index