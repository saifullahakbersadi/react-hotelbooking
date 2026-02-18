import { Box, Button, Typography } from "@mui/material";
import { useHotel } from "../../../hooks/useHotels";
import HotelCard from "../../molecules/HotelCard";
import BookingSearchForm from "../../molecules/HotelSearchForm";
import Banner from "./Banner";
import React, { useEffect, useState } from "react";

function HotelListView() {
  const { hotel } = useHotel();
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(false);
  const [ hotelList, setHotelList ] = useState(hotel);

  useEffect(() => {
    setHotelList(hotel);
  }, [hotel]);


  if (!hotel || hotel.length === 0) {
    return <div>Loading...</div>;
  }

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 10);
      setLoading(false);
    }, 500); // Simulate loading delay
  };
  

  return (
    <>
      {/* Banner with booking form overlapped */}
      <Box sx={{ position: 'relative', width: '100%', mb: 6 }}>
        <Banner />
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            top: { xs: '70%', md: '80%' },
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: '600px', md: ' 1200px' },
            zIndex: 2,
            boxShadow: 4,
            background: 'rgba(255,255,255,0.97)',
            p: { xs: 2, md: 4 },
          }}
        >
          <BookingSearchForm setHotelList={setHotelList} />
        </Box>
      </Box>
      {(!hotelList || hotelList.length === 0) && (
        <Box sx={{ width: '100%', mt: 2, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">No hotels found for your search.</Typography>
        </Box>
      )}
      {hotelList && hotelList.length > 0 && (
        <>
          {hotelList.slice(0, visibleCount).map(
            (hotel: any) => (
              <HotelCard
                key={hotel.id}
                id={hotel.id}
                name={hotel.name}
                location={hotel.location}
                phone={hotel.phone}
                email={hotel.email}
                hotel_images={Array.isArray(hotel.hotel_images) ? hotel.hotel_images.map((a: any) => typeof a === 'string' ? a : a.url) : []}
                rating={hotel.rating}
                amenities={Array.isArray(hotel.amenities) ? hotel.amenities.map((a: any) => typeof a === 'string' ? a : a.name) : []}
              />
            )
          )}
          {visibleCount < hotel.length && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 10}}>
              <Button variant="contained" onClick={handleLoadMore} disabled={loading}>
                {loading ? 'Loading...' : 'Load More'}
              </Button>
            </Box>
          )}
        </>
      )}
    </>
  );
}

export default HotelListView;