import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Radio
} from "@mui/material";
import { UserType } from "../../types/models/User";
import { useNavigate } from "react-router-dom";


type UserRoleProps = {
  selectedRole:UserType|undefined
  setSelectedRole:(role:UserType)=>void
  setConfirmRole:(confirm:boolean)=>void
}



const UserRole:React.FC<UserRoleProps> = ({selectedRole, setSelectedRole, setConfirmRole}) => {
    
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRole(event.target.value as UserType);
  };


  const navigate = useNavigate();


  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
      gap={2}
    >

      <Typography variant="h5" gutterBottom>
        Join as a client or freelancer
      </Typography>

      <Box display="flex" gap={2}>
        <Card
          sx={{
            border:
              selectedRole === "Client"
                ? "2px solid #108a00"
                : "1px solid #e1e1e1",
            borderRadius: "8px",
            padding: "5px",
            cursor: "pointer",
          }}
          onClick={() => setSelectedRole(UserType.Client)}
        >
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography>👔</Typography>
              <Radio
                value="Client"
                checked={selectedRole === "Client"}
                onChange={handleChange}
                sx={{
                  padding: 0,
                  "& .MuiSvgIcon-root": { fontSize: 20 },
                }}
              />
            </Box>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2 }}>
              I'm a client, hiring for a project
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            border:
              selectedRole === "Freelancer"
                ? "2px solid #108a00"
                : "1px solid #e1e1e1",
            borderRadius: "8px",
            padding: "5px",
            cursor: "pointer",
          }}
          onClick={() => setSelectedRole(UserType.Freelance)}
        >
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography>💻</Typography>
              <Radio
                value="Freelancer"
                checked={selectedRole === "Freelancer"}
                onChange={handleChange}
                sx={{
                  padding: 0,
                  "& .MuiSvgIcon-root": { fontSize: 20 },
                }}
              />
            </Box>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2 }}>
              I'm a freelancer, looking for work
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Button
       variant="contained"
       disabled={!selectedRole} 
       sx={{
         backgroundColor: !selectedRole ? "#d3d3d3" : "#108a00", 
         color: !selectedRole ? "#a9a9a9" : "#fff", 
         "&:hover": {
        backgroundColor: !selectedRole ? "#d3d3d3" : "#0c6c00", 
        },
      }}
      onClick={() => setConfirmRole(true)}
   >
  Create Account
</Button>


      <Typography variant="body2">
        Already have an account?{" "}
        <Typography
          component="span"
          sx={{
            color: "#108a00",
            cursor: "pointer",
            textDecoration: "underline",
          }}
          onClick={()=>navigate("/login")}
        >
          Log In
        </Typography>
      </Typography>

    </Box>
  );
};

export default UserRole;
