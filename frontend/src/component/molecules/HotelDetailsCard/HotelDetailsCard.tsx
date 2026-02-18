

import { Box, Typography, Button, Card, CardContent, CardMedia, Chip, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from '@mui/material';
import BookingForm from '../BookingForm';
import BackArrow from '../../atoms/BackArrow';
import { useState } from 'react';
import { useHotelRooms } from '../../../hooks/useHotelRooms';
import { useDispatch } from 'react-redux';
import { setHotelRooms } from '../../../store/hotelRoomsSlice';


function HotelDetailsCard({hotel}: {hotel: any}) {
  const dispatch = useDispatch();
  const [openBookingRoomId, setOpenBookingRoomId] = useState<string | number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const { hotelRooms } = useHotelRooms(hotel.id);

  // Determine hotel image (banner)
  const hotelBanner = hotel.hotel_images && hotel.hotel_images.length > 0
    ? (typeof hotel.hotel_images[0] === 'string' ? hotel.hotel_images[0] : hotel.hotel_images[0].url)
    : (hotel.image || 'https://via.placeholder.com/800x250?text=No+Image');

  return (
    <Box sx={{ maxWidth: 800, margin: '40px auto', p: 4, background: '#fff', borderRadius: 3, boxShadow: 2 }}>
      <BackArrow text='Back to Hotels'/>
      <img src={hotelBanner} alt={hotel.hotel_name} style={{ width: '100%', height: 250, objectFit: 'cover', borderRadius: 8, marginBottom: 24 }} />
      <Typography variant="h4" fontWeight="bold" gutterBottom>{hotel.hotel_name}</Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Address: {hotel.location}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Phone: {hotel.phone}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Email: {hotel.email}
      </Typography>

      {/* Hotel Amenities */}
      {hotel.amenities && hotel.amenities.length > 0 && (
        <Box sx={{ mt: 2, mb: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            Hotel Amenities:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {hotel.amenities.map((amenity: any, idx: number) => (
              <span key={idx} style={{ marginRight: 4 }}>
                {/* Support both string and object formats */}
                {typeof amenity === 'string' ? amenity : amenity.name}
              </span>
            ))}
          </Box>
        </Box>
      )}

      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Available Rooms</Typography>
      <Grid container spacing={3} sx={{ width: '100%', margin: 0 }}>
        {hotelRooms && hotelRooms.length > 0 ? hotelRooms.map((room: any) => (
          <Grid item key={room.id} xs={12} sm={12} md={12} sx={{ display: 'flex' }}>
            <Card sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 400, height: '100%' }}>
              <CardMedia
                component="img"
                height="140"
                image={room.room_images && room.room_images.length > 0 ? room.room_images[0].url : ''}
                alt={room.id}
              />
              <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography variant="subtitle1" fontWeight="bold">Room {room.roomNumber} - {room.type}</Typography>
                <Typography variant="body2">Status: {room.availability ? 'Available' : 'Unavailable'}</Typography>
                <Typography variant="h4" color="primary" fontWeight="bold" sx={{ my: 1, fontSize: 32, letterSpacing: 1, textAlign: 'center', bgcolor: '#f5f5f5', borderRadius: 2, py: 1 }}>
                  <Typography variant='body2' fontSize={10}>Per Night</Typography>${room.price} 
                </Typography>
                <Typography><small>Includes taxes and charges</small></Typography>
                <Typography variant="body2">Capacity: {room.capacity}</Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontWeight: 'bold' }}>
                    Amenities:
                  </Typography>
                  {room.room_amenities && Array.isArray(room.room_amenities) && room.room_amenities.length > 0 ? (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {room.room_amenities.map((amenity: any, idx: number) => (
                        <Chip key={idx} label={amenity.name} color="secondary" size="small" />
                      ))}
                    </Box>
                  ) : (
                    <Typography variant="body2" color="text.secondary">Not available</Typography>
                  )}
                </Box>
              </CardContent>
              <Box sx={{ p: 2, pt: 0 }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setSelectedRoom(room);
                    setDialogOpen(true);
                    dispatch(setHotelRooms([room]));
                  }}
                >
                  Book Now
                </Button>
      {/* Booking Dialog Modal */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          Book Room
          <IconButton onClick={() => setDialogOpen(false)} size="small"><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent>
          {/* Optionally pass selectedRoom as prop to BookingForm if needed */}
          <BookingForm />
        </DialogContent>
      </Dialog>
              </Box>
            </Card>
          </Grid>
        )) : (
          <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
            No rooms available for this hotel.
          </Typography>
        )}
      </Grid>
    </Box>
  )
}

export default HotelDetailsCard;