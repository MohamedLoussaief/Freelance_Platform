import React from 'react';
import NavBar from '../components/organisms/NavBar';
import JobPostCard from '../components/organisms/JobPostCard';
import { useAuthContext } from '../context/AuthContext';
import { Box, Typography } from '@mui/material';
import useDecodedToken from '../hooks/useDecodedToken';

const Home: React.FC = ()=>{

const {user, loading} = useAuthContext()    
const decodedToken = useDecodedToken()
const userType = decodedToken?.userType;

if(loading){
    return<></>
}


return( <div>

<NavBar/>


{user&&  <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', 
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" component="h1">
        {userType==="Freelancer"?"Dashboard Freelancer":"Dashboard Client"}
      </Typography>
    </Box>}


{!user&&<JobPostCard/>}


</div> )

}

export default Home