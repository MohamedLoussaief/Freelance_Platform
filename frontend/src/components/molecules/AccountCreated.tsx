import React, { useEffect } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

const AccountCreated:React.FC = () => {

const navigate = useNavigate();

useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/verify-email"); // Replace with your actual verify email route
    }, 30000); // 30 seconds

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [navigate]);
    
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 4,
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Icon or Avatar */}
      <Avatar
        sx={{
          bgcolor: "green",
          width: 80,
          height: 80,
          marginBottom: 2,
        }}
      >
        <AccountCircleIcon sx={{ fontSize: 60 }} />
      </Avatar>

      {/* Message */}
      <Typography variant="h6" sx={{ fontWeight: 500, color: "#333" }}>
        Congratulations, your account has been created.
      </Typography>
      <Typography variant="body1" sx={{ color: "#555", marginTop: 1 }}>
        Let's get you started!
      </Typography>
    </Box>
  );
};

export default AccountCreated;
