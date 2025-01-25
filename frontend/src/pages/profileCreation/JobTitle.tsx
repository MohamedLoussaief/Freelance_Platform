import { Box, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import NavBar from "../../components/organisms/NavBar";
import StepNavigation from "../../components/molecules/StepNavigation";
import { update } from "../../api/client";
import useUserData from "../../hooks/useUserData";



const JobTitle:React.FC = ()=>{

const { userData, loading } = useUserData();
const [jobTitle, setJobTitle] = useState<string>("");
const [error, setError] = useState<string>("");
const [isLoading, setIsLoading] = useState<boolean>(false);

useEffect(()=>{

if(!loading && userData?.skills){
setJobTitle(userData?.jobTitle)
}

}, [loading, userData])



const handleSubmit = async() => {

setIsLoading(true)

if(jobTitle.trim() === ""){
setError("Please enter a job title.");
setIsLoading(false);
return;
}

try{

const addJobTitle = await update('/profile/job-title', {jobTitle})

if(addJobTitle){

return true;    

}

}catch(error:any){

setError(error.message)

}finally{
  setIsLoading(false)
}

};

return(

<Box
    sx={{
    display: 'flex',
    flexDirection: 'column', 
    height: '95vh',
      }}
>

<NavBar/>




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
    {/* Title */}
    <Typography variant="h5" fontWeight="bold" textAlign="center">
      Got it. Now, add a title to tell the world what you do.
    </Typography>

    {/* Small Title */}
    <Typography variant="subtitle1" color="textSecondary" textAlign="center">
      Your job title.
    </Typography>

    {/* TextField */}
    <TextField
      label="Job Title"
      variant="outlined"
      fullWidth
      value={jobTitle}
      onChange={(e) => setJobTitle(e.target.value)}
      error={!!error}
      helperText={error}
    />

  </Box>
  
  <StepNavigation action={handleSubmit} isLoading={isLoading}  />

</Box>
)

}

export default JobTitle;