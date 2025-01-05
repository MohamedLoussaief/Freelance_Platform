import React, { useEffect, useState } from "react";
import NavBar from "../../components/organisms/NavBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import StepNavigation from "../../components/molecules/StepNavigation";
import { FormHelperText } from "@mui/material";
import { fieldOfWork } from "../../services/userService";
import useUserData from "../../hooks/useUserData";




const FieldOfWork:React.FC = ()=>{

const { userData, loading } = useUserData();
const [selectedOption, setSelectedOption] = useState<string>("");
const [error, setError] = useState<string>("");


useEffect(()=>{
if(!loading && userData?.service){
setSelectedOption(userData?.service)
}
}, [userData, loading])


const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
setSelectedOption((event.target as HTMLInputElement).value);
setError("")
};
    


const handleSubmit = async()=>{
    
if (!selectedOption) {
    setError("Please select a work type"); 
    return;   
  }

try{

const res = await fieldOfWork(selectedOption)

if(res){   
return true
}

}catch(error:any){

setError(error.message)

}

}


return (
<Box
    sx={{
        display: 'flex',
        flexDirection: 'column', 
        height: '95vh',
      }}
>

<NavBar/>


<Box
      sx={{
        padding: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
        width: "100%",
        maxWidth: 400,
        margin:"auto",
        marginBottom:"50px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography
        variant="h6"
        component="h2"
        sx={{ marginBottom: 2, textAlign: "center" }}
      >
        Great, so what kind of work are you here to do?
      </Typography>
      <RadioGroup value={selectedOption} onChange={handleChange}>
        <FormControlLabel
          value="Web, Mobile & Software Dev"
          control={<Radio />}
          label="Web, Mobile & Software Dev"
        />
        <FormControlLabel
          value="IT & Networking"
          control={<Radio />}
          label="IT & Networking"
        />
        <FormControlLabel
          value="Data Science & Analytics"
          control={<Radio />}
          label="Data Science & Analytics"
        />
        <FormControlLabel
          value="Design & Creative"
          control={<Radio />}
          label="Design & Creative"
        />
        <FormControlLabel
          value="Sales & Marketing"
          control={<Radio />}
          label="Sales & Marketing"
        />
        <FormControlLabel
          value="Translation"
          control={<Radio />}
          label="Translation"
        />
        <FormControlLabel
          value="Writing"
          control={<Radio />}
          label="Writing"
        />
      </RadioGroup>
     {/* Error Message */}
       {error && <FormHelperText>{error}</FormHelperText>}
</Box>

<StepNavigation action={handleSubmit} />


</Box>)


}

export default FieldOfWork