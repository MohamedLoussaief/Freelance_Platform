import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import FieldOfWork from "../pages/profileCreation/FieldOfWork";
import Skills from "../pages/profileCreation/Skills";
import JobTitle from "../pages/profileCreation/JobTitle";
import Experience from "../pages/profileCreation/Experience";
import Education from "../pages/profileCreation/Education";
import Language from "../pages/profileCreation/Language";
import Bio from "../pages/profileCreation/Bio";
import HourlyRate from "../pages/profileCreation/HourlyRate";
import useUserData from "../hooks/useUserData";



const CreateProfile:React.FC = ()=>{

const {loading} = useUserData();

if(loading){  
return<></>
}

return(

<Routes>
<Route path="field-work" element={<FieldOfWork/>} />
<Route path="skills" element={<Skills/>} />
<Route path="job-title" element={ <JobTitle/> } />
<Route path="experience" element={<Experience/>} />
<Route path="education" element={<Education/>} />
<Route path="language" element={<Language/>} />
<Route path="bio" element={<Bio/>} />
<Route path="hourly-rate" element={<HourlyRate/>} />

<Route path="*" element={<Navigate to="field-work"/>} />
</Routes>


)

}

export default CreateProfile;