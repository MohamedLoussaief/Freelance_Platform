import React, { useEffect, useState } from "react";
import { Box, CircularProgress, LinearProgress } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../atoms/Button";

const StepNavigation: React.FC<{
  action?: () => Promise<boolean | undefined> | true;
  isLoading?: boolean;
}> = ({ action, isLoading }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current route

  // Define steps and calculate progress dynamically
  const steps = [
    "/create-profile/field-work",
    "/create-profile/skills",
    "/create-profile/job-title",
    "/create-profile/experience",
    "/create-profile/education",
    "/create-profile/language",
    "/create-profile/bio",
    "/create-profile/hourly-rate",
    "/",
  ];
  const totalSteps = steps.length;

  // Track current progress
  const [progress, setProgress] = useState<number>(0);

  // Update progress based on the current route
  useEffect(() => {
    const currentIndex = steps.indexOf(location.pathname);
    if (currentIndex !== -1) {
      setProgress((currentIndex / (totalSteps - 1)) * 100); // Calculate progress percentage
    }
  }, [location.pathname, steps, totalSteps]);

  const getNextPath = (): string => {
    const currentIndex = steps.indexOf(location.pathname);
    return steps[(currentIndex + 1) % totalSteps]; // Loop to the first step if at the end
  };

  const getPrevPath = (): string => {
    const currentIndex = steps.indexOf(location.pathname);
    return steps[(currentIndex - 1 + totalSteps) % totalSteps]; // Loop to the last step if at the start
  };

  const isFirstStep = location.pathname === steps[0];

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      padding={2}
      border="1px solid #ddd"
      borderRadius={4}
    >
      {/* Back Button */}
      {!isFirstStep && (
        <Button
          variant="outlined"
          color="success"
          onClick={() => {
            navigate(getPrevPath());
          }}
          sx={{ width: "100px" }}
        >
          Back
        </Button>
      )}

      {/* Progress Bar */}
      <Box flexGrow={1} mx={2}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ height: 10 }}
        />
      </Box>

      {/* Next Button */}
      <Button
        type="submit"
        variant="contained"
        color="success"
        onClick={async () => {
          const success = action && (await action());
          if (success) {
            navigate(getNextPath());
          }
        }}
        sx={{ width: "200px" }}
      >
        {isLoading ? (
          <CircularProgress size={24} sx={{ color: "white" }} />
        ) : (
          "Next"
        )}
      </Button>
    </Box>
  );
};

export default StepNavigation;
