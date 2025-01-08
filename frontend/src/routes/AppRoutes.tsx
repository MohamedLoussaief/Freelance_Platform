import React, { useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import CreateProfile from "./CreateProfile";
import useDecodedToken from "../hooks/useDecodedToken";
import { useAuthContext } from "../context/AuthContext";
import NotFoundPage from "../pages/NotFound";




const AppRoutes: React.FC = () =>{

const {user} = useAuthContext()     
const decodedToken = useDecodedToken()



const userType = decodedToken?.userType;

return(
<Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/login"  element={!user ? <Login/> : <Navigate to="/"/>} />
    <Route path="/signup" element={!user ?<Signup/>: <Navigate to="/"/> } />
    {userType==="Freelancer"&&<Route path="/create-profile/*"  element={<CreateProfile/>} />}
    <Route path="/not-found"  element={<NotFoundPage/>} />
</Routes>
)

}


export default AppRoutes;