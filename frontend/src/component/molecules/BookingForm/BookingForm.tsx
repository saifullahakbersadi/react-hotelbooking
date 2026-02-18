import { Button, Link, TextField, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux';
import { setHotelBookings } from '../../../store/hotelBookingSlice';
import { useNavigate } from 'react-router-dom';

type BookingFormData = {
  name: string;
  email: string;
  phone: string;
  specialRequests: string;
}

function BookingForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(setHotelBookings(formData ? [formData] : []));
    navigate('/booking-confirmation');
    // Handle form submission logic here
    console.log(formData);
  }
  return (
    <div>
      <Typography>Continue as guest</Typography>
      <form onSubmit={handleSubmit}>
        <TextField name='name' label='Name' variant='outlined' fullWidth margin='normal' value={formData.name} onChange={handleChange} />
        <TextField name='email' label='Email' variant='outlined' fullWidth margin='normal' value={formData.email} onChange={handleChange} />
        <TextField name='phone' label='Phone' variant='outlined' fullWidth margin='normal' value={formData.phone} onChange={handleChange} />
        <TextField name='specialRequests' label='Special Requests' variant='outlined' fullWidth margin='normal' multiline rows={4} value={formData.specialRequests} onChange={handleChange} />
        <Button type='submit' variant='contained' color='primary' fullWidth sx={{ mt: 2 }}>Submit</Button>
      </form>
      <Typography fontSize={40} sx={{ mt: 2, mb: 1, textAlign: 'center' }}>
        OR
      </Typography>
      <Typography textAlign={'center'}>
        Login to your account to book faster!
        <Link href="/login" underline="hover" sx={{ ml: 1 }}>Login</Link>
      </Typography>
    </div>
  )
}

export default BookingForm