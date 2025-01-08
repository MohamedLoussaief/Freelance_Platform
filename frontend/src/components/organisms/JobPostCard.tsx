import React from 'react';
import postCard from "../../assets/images/post-card.png"
import {
  Box,
  Typography,
  Button,
  Stack,
  Card,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const JobPostCardWithImage:React.FC = () => {

const navigate = useNavigate();    

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 4, bgcolor: '#f7f9f8', pt:6, mt:10 }}>

       <Card sx={{ width: '50%', display: 'flex', p: 3 }}>
        {/* Left Image */}
        <Box
          component="img"
          src={postCard} // Replace with the actual image URL
          alt="Hand drawing on a job post"
        />
        </Card>
      {/* Features Section */}
      <Box sx={{ width: '45%', textAlign: 'left', pl: 3 }}>
        <Typography variant="h4" fontWeight="bold" mb={2}>
          Up your work game, it's easy
        </Typography>
        <Typography variant="body1" mb={2}>
          <strong>🖋 No cost to join</strong>
          <br />
          Register and browse talent profiles, explore projects, or even book a consultation.
        </Typography>
        <Typography variant="body1" mb={2}>
          <strong>📋 Post a job and hire top talent</strong>
          <br />
          Finding talent doesn’t have to be a chore. Post a job or we can search for you!
        </Typography>
        <Typography variant="body1" mb={2}>
          <strong>💼 Work with the best—without breaking the bank</strong>
          <br />
          Upwork makes it affordable to up your work and take advantage of low transaction rates.
        </Typography>
        <Stack direction="row" spacing={2} mt={3}>
          <Button variant="contained" color="success" size="large" 
          onClick={()=>navigate("/signup")}>
            Sign up for free
          </Button>
{  /*        <Button variant="outlined" color="success" size="large">
            Learn how to hire
          </Button> */}
        </Stack>
      </Box>
    </Box>
  );
};

export default JobPostCardWithImage;
