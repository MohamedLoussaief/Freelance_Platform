import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {UserType} from "../../types/models/User";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getNames } from "country-list";
import { signup } from "../../services/userService";
import { useNavigate } from "react-router-dom";




// Validation schema
const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string()
  .min(6, "Password must be at least 6 characters")
  .max(20, "Password must not exceed 20 characters")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/\d/, "Password must contain at least one digit")
  .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
  country: z.string().min(1, "Please select a country"),
  companyName: z.string().optional(),
  userType: z.string(),
  showPassword: z.boolean().optional(),
});

type SignupFormData = z.infer<typeof signupSchema>;


const SignupForm: React.FC<{selectedRole:UserType|undefined, 
  setSuccess:(s:boolean)=>void}> = ({selectedRole, setSuccess}) => {

  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      country: "",
      companyName: "",
      userType: selectedRole,
      showPassword: false,
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const countries = getNames(); 


  const showPassword = watch("showPassword");

  const togglePasswordVisibility = () => {
    setValue("showPassword", !showPassword);
  };

  const onSubmit = async(data: SignupFormData) => {
    //console.log("Form Submitted:", data);
    setIsLoading(true)
    try{
     const res = await signup(data)
  if(res){
    setSuccess(true)
     }

    }catch(error:any){
      if(error.response?.status === 409){
        setError("email", {
          type: "server",
          message: error.response.data.message,
        })
      }
    }finally{
      setIsLoading(false)
    }
  };

  return (
<Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 5,
        p: 3,
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h5" textAlign="center" mb={3}>
        {selectedRole === "Freelancer"
          ? "Sign up to find work"
          : "Sign up to hire talent"}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" gap={2} mb={2}>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="First name"
                variant="outlined"
                size="small"
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                fullWidth
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Last name"
                variant="outlined"
                size="small"
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                fullWidth
              />
            )}
          />
        </Box>

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={
                selectedRole === UserType.Client
                  ? "Work email address"
                  : "Email"
              }
              variant="outlined"
              size="small"
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
              sx={{ mb: 2 }}
            />
          )}
        />

        {selectedRole === UserType.Client && (
          <Controller
            name="companyName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Company Name"
                variant="outlined"
                size="small"
                fullWidth
                sx={{ mb: 2 }}
              />
            )}
          />
        )}

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              variant="outlined"
              size="small"
              type={showPassword ? "text" : "password"}
              error={!!errors.password}
              helperText={errors.password?.message}
              fullWidth
              sx={{ mb: 2 }}
              slotProps={{
                input: {
                endAdornment: (
                  <InputAdornment position="end">
                    {!showPassword ? (
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
          )}
        />

        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Country"
              select
              variant="outlined"
              size="small"
              error={!!errors.country}
              helperText={errors.country?.message}
              fullWidth
              sx={{ mb: 2 }}
            >
              {countries.map(
                (country:any) => (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                )
              )}
            </TextField>
          )}
        />

     <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isLoading} // Disable the button while loading
          sx={{
            backgroundColor: "#108a00",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#0c6c00",
            },
            mb: 2,
          }}
        >
          {isLoading ? (
            <CircularProgress size={24} sx={{ color: "white" }} /> // Show loading spinner
          ) : (
            "Create my account"
          )}
        </Button>

        <Typography textAlign="center" variant="body2">
          Already have an account?{" "}
          <Typography
            component="span"
            sx={{
              color: "#108a00",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={() => navigate("/login")}
          >
            Log In
          </Typography>
        </Typography>
      </form>
    </Box>
  );
};

export default SignupForm;
