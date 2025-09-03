import React, { useEffect } from "react";
import NavBar from "../components/organisms/NavBar";
import JobPostCard from "../components/organisms/JobPostCard";
import { useAuthContext } from "../context/AuthContext";
import { Box, Typography } from "@mui/material";
import useDecodedToken from "../hooks/useDecodedToken";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const { user, loading } = useAuthContext();
  const decodedToken = useDecodedToken();
  const userType = decodedToken?.userType;
  const verified = decodedToken?.verified;
  const navigate = useNavigate();

  if (loading) {
    return <></>;
  }

  useEffect(() => {
    if (user && !verified) {
      navigate("/verify-email");
      return;
    }
  }, [user, verified, navigate]);

  return (
    <div>
      <NavBar />

      {user && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" component="h1">
            {userType === "Freelancer"
              ? "Dashboard Freelancer"
              : "Dashboard Client"}
          </Typography>
        </Box>
      )}

      {!user && <JobPostCard />}
    </div>
  );
};

export default Home;
