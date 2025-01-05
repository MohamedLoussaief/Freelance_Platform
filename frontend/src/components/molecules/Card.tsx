import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";

const Card: React.FC<{ experience?: any; education?: any }> = ({
  experience,
  education,
}) => {
  const formatDate = (dateString: string): string => {
    return format(new Date(dateString), "MMMM yyyy");
  };

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "300px", // Fixed card width
        backgroundColor: "#fff",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        flexShrink: 0, // Prevent shrinking
      }}
    >
      <Box
        sx={{
          width: "50px",
          height: "50px",
          backgroundColor: "green",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "4px",
          marginBottom: "8px",
        }}
      >
        <Typography variant="h6" color="white">
          📁
        </Typography>
      </Box>
      <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "4px" }}>
        {experience?.jobTitle} {education?.university}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ marginBottom: "8px" }}>
        {experience?.company} {" "}
        {experience?.startDate && formatDate(experience.startDate)} {"  "}
        {experience?.endDate && formatDate(experience.endDate)}{"  "}
        {education?.degree}  {education?.startYear}  {education?.endYear}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {experience?.description} {education?.field}
      </Typography>
    </Box>
  );
};

export default Card;
