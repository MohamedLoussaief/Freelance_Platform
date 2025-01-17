import React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { login } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const { dispatch } = useAuthContext();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      if (formData.email.trim() === "" || formData.password.trim() === "") {
        setError("All fields are required.");
        setIsLoading(false); 
        return;
      }
  
      
      const { showPassword, ...loginData } = formData;
  
      const token = await login(loginData);
      if (token) {
        console.log(token)
        dispatch({ type: "LOGIN", payload: {token:token} });
        navigate("/");
      }
    } catch (error: any) {
      setError(error.response?.data?.message );
      console.error(error)
    } finally {
      setIsLoading(false);
    }
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
          error={!!error}
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
          error={!!error}
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
      {/* Error Message */}
      {error && <FormHelperText sx={{color:"red", textAlign:"center", fontSize:"15px"}}>{error}</FormHelperText>}
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
