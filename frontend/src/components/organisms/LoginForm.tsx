import React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login Data:", formData);
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 5,
        p: 3,
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h5" textAlign="center" mb={3}>
        Log In to Your Account
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          size="small"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />



        <TextField
          label="Password"
          variant="outlined"
          size="small"
          name="password"
          type={formData.showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
          slotProps={{
            input:{ 
            endAdornment: (
              <InputAdornment position="end">
                {formData.showPassword ? (
                  <VisibilityOff
                    sx={{ cursor: "pointer" }}
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <Visibility
                    sx={{ cursor: "pointer" }}
                    onClick={togglePasswordVisibility}
                  />
                )}
              </InputAdornment>
            ),
         }
          }}
        />


        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#108a00",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#0c6c00",
            },
            mb: 2,
          }}
        >
          Log In
        </Button>
        <Typography textAlign="center" variant="body2">
          Don't have an account?{" "}
          <Typography
            component="span"
            sx={{
              color: "#108a00",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Sign Up
          </Typography>
        </Typography>
      </form>
    </Box>
  );
};

export default LoginForm;
