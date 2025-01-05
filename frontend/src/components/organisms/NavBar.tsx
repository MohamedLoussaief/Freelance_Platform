import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchBarFilter from '../molecules/SearchBarFilter';
import { UserType } from '../../types/models/User';
import { useLocation } from 'react-router-dom'; 
import { useAuthContext } from '../../context/AuthContext';

const NavBar: React.FC<{selectedRole?:UserType|undefined, setSelectedRole?:(role:UserType)=>void 
  confirmRole?:boolean, success?:boolean}> = ({selectedRole, setSelectedRole, confirmRole, success}) => {
  
  const location = useLocation();
  const isAuthRoute = location.pathname === '/signup' || location.pathname === '/login' || 
  location.pathname==='/create-profile/field-work'|| location.pathname==='/create-profile/skills' || 
  location.pathname==='/create-profile/job-title' || location.pathname==='/create-profile/experience' ||
  location.pathname==='/create-profile/education' || location.pathname==='/create-profile/language' ||
  location.pathname==='/create-profile/bio' || location.pathname==='/create-profile/hourly-rate'


  const {user} = useAuthContext() 

  //const token= (user as { token: string} )?.token

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor:"transparent", 
        color:"black", boxShadow: 'none', border:"none", 
        borderBottom: '2px solid #efefef',
        }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, 
            fontFamily: "'Roboto Slab', sans-serif", fontWeight:"bold"}}>
            FreelanceWave
          </Typography>
{ !isAuthRoute&&<><SearchBarFilter/>

{ !user && <><Button color="inherit" sx={{ textTransform: "none", marginLeft:"10px"}}>Login</Button>
          <Button color="inherit"   sx={{textTransform: "none", backgroundColor: "#108a00", 
            "&:hover": {backgroundColor: "#0c6a00"}, 
            color: "white",
            marginLeft:"10px"}}>Sign up</Button></>}
            </>}

{(confirmRole&&!success)&&<>                    
<Typography variant="body1">
{selectedRole==="Client"?'Looking for work?':'Here to hire talent?'}
</Typography>

<Typography
  component="a"
  href="#"
  sx={{ color: "#108a00", textDecoration: "none", cursor: "pointer", marginLeft:"20px", 
    "&:hover": {
      textDecoration: "underline",
    },
  }}
  onClick={(e) => {
    e.preventDefault(); 
    setSelectedRole&&setSelectedRole(
      selectedRole === "Client" ? UserType.Freelance : UserType.Client
    );
  }}
>
Apply as
  {selectedRole==="Client"?' talent':' a Client'}
</Typography>

</>}

        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
