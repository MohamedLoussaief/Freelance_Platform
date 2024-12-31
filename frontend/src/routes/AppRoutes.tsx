import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";

const AppRoutes: React.FC = () =>{

return(
<Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/signup" element={<Signup/>} />
</Routes>
)

}


export default AppRoutes;