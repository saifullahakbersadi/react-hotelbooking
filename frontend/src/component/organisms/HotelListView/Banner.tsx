import React from "react";
import Box from "@mui/material/Box";

// A simple banner with a hotel-related Unsplash image
const Banner: React.FC = () => (
  <Box
    sx={{
      width: '100%',
      height: { xs: 200, md: 350 },
      backgroundImage: `url('https://r-xx.bstatic.com/xdata/images/xphoto/2880x868/572149679.jpeg?k=2a916aad67124c80308a09340ef5c5d1ee2d4f0ca607fae4ce4f1f45376e6799&o=')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      mb: { xs: 6, md: 10 },
      boxShadow: 3,
    }}
  >
    {/* Optionally add overlay or text here */}
  </Box>
);

export default Banner;
