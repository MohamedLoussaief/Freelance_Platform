import { Box, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import NavBar from "../../components/organisms/NavBar";
import axios from "axios";
import StepNavigation from "../../components/molecules/StepNavigation";
import { useUser } from "../../context/UserContext";

const HourlyRate: React.FC = () => {
  const { userData, loading } = useUser();
  const [hourlyRate, setHourlyRate] = useState<number>(1);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!loading && userData?.hourlyRate) {
      setHourlyRate(userData?.hourlyRate);
    }
  }, [userData, loading]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (newValue === "" || Number(newValue) > 0) {
      setError("");
    } else {
      setError("Please enter a strictly positive number.");
    }
    setHourlyRate(Number(newValue));
  };

  const handleBlur = () => {
    if (String(hourlyRate) === "" || hourlyRate <= 0) {
      setError("Please enter a strictly positive number.");
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    if (hourlyRate <= 0) {
      setError("Please enter a valid number");
      setIsLoading(false);
      return;
    }

    try {
      const addHourlyRate = await axios.patch("/profile/hourly-rate", {
        hourlyRate,
      });

      if (addHourlyRate) {
        return true;
      }
    } catch (error: any) {
      setError(error.errors.hourlyRate);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "95vh",
      }}
    >
      <NavBar />

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
        p={4}
        maxWidth="400px"
        mx="auto"
        marginTop={"10%"}
        marginBottom={"10%"}
        border="1px solid #ddd"
        borderRadius="8px"
        boxShadow="0 2px 10px rgba(0, 0, 0, 0.1)"
      >
        {/* HourlyRate */}
        <Typography variant="h5" fontWeight="bold" textAlign="center">
          Now, let's set your hourly rate
        </Typography>

        <TextField
          label="Positive Number"
          type="number"
          value={hourlyRate}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
          error={!!error}
          helperText={error || "Enter a number greater than 0"}
          InputProps={{
            inputProps: {
              min: 1,
              step: 1,
            },
          }}
        />
      </Box>

      <StepNavigation action={handleSubmit} isLoading={isLoading} />
    </Box>
  );
};

export default HourlyRate;
