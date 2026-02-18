import { Card, CardContent, CardMedia, Typography, Box, Button, Chip } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setHotels } from "../../../store/hotelSlice";


interface HotelCardProps {
  id: string;
  name: string;
  location: string;
  phone: string;
  email: string;
  rating?: number;
  hotel_images?: string [];
  amenities?: string [];
}


function HotelCard({ id, name, location, phone, email, hotel_images, rating, amenities }: HotelCardProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleBookNow = () => {
    dispatch(setHotels([{ id, name, location, phone, email, hotel_images, rating, amenities }]));
    navigate('/hotel-details');
  };
  return (
    <Card sx={{ display: "flex", maxWidth: '100%', width: '100%', margin: "20px auto", boxShadow: 3, borderRadius: 2, minHeight: 200, background: '#fff',
      '@media (min-width:600px)': { maxWidth: 800 },
    }}>
      {/* Left: Hotel Images (scrollable if multiple) */}
      <Box sx={{ width: 200, minWidth: 200, maxWidth: 200, overflowX: 'auto', display: 'flex', flexDirection: 'row', alignItems: 'center', bgcolor: '#fafafa' }}>
        {hotel_images && hotel_images.length > 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, width: '100%' }}>
            {hotel_images.map((img, idx) => (
              <CardMedia
                key={idx}
                component="img"
                sx={{ width: 200, height: 150, objectFit: 'cover', borderRadius: 1 }}
                image={img}
                alt={name + ' image ' + (idx + 1)}
              />
            ))}
          </Box>
        ) : (
          <CardMedia
            component="img"
            sx={{ width: 200, height: 150, objectFit: 'cover', borderRadius: 1 }}
            image={'https://via.placeholder.com/200x150?text=No+Image'}
            alt={name}
          />
        )}
      </Box>

      {/* Right: Hotel Info */}
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {location}
          </Typography>

          {/* Phone and Email */}
          <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Phone: {phone}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: {email}
            </Typography>
          </Box>

          {/* Amenities */}
          {amenities && amenities.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Amenities:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {amenities.map((amenity, idx) => (
                  <Chip key={idx} label={amenity} color="secondary" size="small" />
                ))}
              </Box>
            </Box>
          )}
        </CardContent>

        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
          <Button variant="contained" color="primary" onClick={handleBookNow}>
            See availability
          </Button>
        </Box>
      </Box>
    </Card>
  );
}

export default HotelCard;