import React from "react";
import Box from "@mui/material/Box";

// A simple banner with a hotel-related Unsplash image
const Banner: React.FC = () => (
  <Box
    sx={{
      width: '100vw',
      minWidth: '100vw',
      maxWidth: '100vw',
      height: { xs: 200, md: 350 },
      backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
      left: '50%',
      right: '50%',
      marginLeft: '-50vw',
      marginRight: '-50vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 3,
    }}
  >
    {/* Optionally add overlay or text here */}
  </Box>
);

export default Banner;
