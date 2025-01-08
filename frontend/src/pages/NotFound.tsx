import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // If you're using React Router

const NotFoundPage:React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#f9f9f9', // Optional background color
        padding: 2,
      }}
    >
      <Typography variant="h1" sx={{ fontSize: '6rem', fontWeight: 'bold', color: '#555' }}>
        404
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: 2, color: '#777' }}>
        Oops! The page you are looking for does not exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
        onClick={() => navigate('/')} // Navigate back to the home page
      >
        Go Back Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;











