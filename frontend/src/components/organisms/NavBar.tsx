import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchBarFilter from '../molecules/SearchBarFilter';
import { UserType } from '../../types/models/User';
import { useLocation } from 'react-router-dom'; 

const NavBar: React.FC<{selectedRole:UserType|undefined, setSelectedRole:(role:UserType)=>void 
  confirmRole:boolean}> = ({selectedRole, setSelectedRole, confirmRole}) => {
  
  const location = useLocation();
  const isAuthRoute = location.pathname === '/signup' || location.pathname === '/login';
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
          <Button color="inherit" sx={{ textTransform: "none", marginLeft:"10px"}}>Login</Button>
          <Button color="inherit"   sx={{textTransform: "none", backgroundColor: "#108a00", 
            "&:hover": {backgroundColor: "#0c6a00"}, 
            color: "white",
            marginLeft:"10px"}}>Sign up</Button></>}

{confirmRole&&<>                    
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
    setSelectedRole(
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
