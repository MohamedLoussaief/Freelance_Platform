import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import CreateProfile from "./CreateProfile";
import useDecodedToken from "../hooks/useDecodedToken";
import { useAuthContext } from "../context/AuthContext";
import NotFoundPage from "../pages/NotFound";
import VerifyEmail from "../pages/VerifyEmail";
import ActivateRedirect from "../pages/ActivateRedirect";

const AppRoutes: React.FC = () => {
  const { user, loading } = useAuthContext();
  const decodedToken = useDecodedToken();
  const userType = decodedToken?.userType;
  const verified = decodedToken?.verified;

  if (loading) {
    return <></>;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/verify-email"
        element={user && !verified ? <VerifyEmail /> : <Navigate to="/" />}
      />
      <Route path="/activate-account/:token" element={<ActivateRedirect />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route
        path="/signup"
        element={!user ? <Signup /> : <Navigate to="/" />}
      />
      {userType === "Freelancer" && (
        <Route path="/create-profile/*" element={<CreateProfile />} />
      )}
      <Route path="/not-found" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
};

export default AppRoutes;
