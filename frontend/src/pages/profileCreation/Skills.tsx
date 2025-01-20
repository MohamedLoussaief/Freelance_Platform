import { Box, Chip, FormHelperText, InputAdornment, TextField, Typography } from "@mui/material"
import StepNavigation from "../../components/molecules/StepNavigation"
import NavBar from "../../components/organisms/NavBar"
import { useEffect, useState } from "react";
import { remove, update } from "../../api/client";
import useUserData from "../../hooks/useUserData";



const Skills: React.FC = ()=>{


const { userData, loading } = useUserData();
const [skills, setSkills] = useState<string[]>([]);
const [inputValue, setInputValue] = useState<string>("");
const [error, setError] = useState<string>("")


useEffect(() => {
  if (!loading && userData?.skills) {
    setSkills(Array.isArray(userData.skills) ? userData.skills : []);
  }
}, [loading, userData]);


const addSkill = (newSkill: string) => {
    if (newSkill && !skills.includes(newSkill) && skills.length < 15) {
      setSkills([...skills, newSkill]);
    }
    setInputValue(""); // Clear input
  };

const removeSkill = async(skillToRemove: string) => {
   try{
    await remove(`/profile/delete-skills/${skillToRemove}`)
    setSkills(skills.filter((skill) => skill !== skillToRemove));
   }catch(error:any){
   setError(error.message)
   }
  };

const handleSubmit = async()=>{

if(skills.length===0){

setError("Please add skills"); 
return;   

}

try{

const addSkills = await update('/profile/add-skills', {skills})  
    
if(addSkills){

return true    

}

}catch(error:any){

setError(error.message)

}

}


return<Box
sx={{
    display: 'flex',
    flexDirection: 'column', // Stack items vertically
    height: '95vh', // Full viewport height
  }}
>


<NavBar/>

<Box sx={{ width: "100%", maxWidth: "600px", margin: "auto", marginBottom:"10%", marginTop:"10%" }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Nearly there! What work are you here to do?
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Your skills show clients what you can offer and help us choose which
        jobs to recommend to you. Add or remove the ones we’ve suggested, or
        start typing to pick more. It’s up to you.
      </Typography>
      <Typography
        variant="body2"
        color="primary"
        sx={{ cursor: "pointer", mb: 2 }}
      >
        Why choosing carefully matters
      </Typography>

      <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
        Your skills
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 1,
          border: "1px solid #ccc",
          borderRadius: 1,
          padding: 1,
        }}
      >
        {/* Render Chips */}
        {skills.map((skill, index) => (
          <Chip
            key={index}
            label={skill}
            onDelete={() => removeSkill(skill)}
            color="primary"
            variant="outlined"
          />
        ))}

        {/* Input for adding skills */}
        <TextField
          variant="standard"
          placeholder={skills.length < 15 ? "Enter skills here" : ""}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addSkill(inputValue.trim());
            }
          }}
          InputProps={{
            disableUnderline: true,
            endAdornment: (
              <InputAdornment position="end">
                {skills.length}/15
              </InputAdornment>
            ),
          }}
          sx={{
            flex: 1,
            minWidth: "120px",
            "& .MuiInputBase-input": {
              padding: "4px",
            },
          }}
        />
      </Box>
      <Typography
        variant="caption"
        color={skills.length === 15 ? "error" : "text.secondary"}
        sx={{ mt: 1, display: "block" }}
      >
        Max 15 skills
      </Typography>
    {/* Error Message */}
    {error && <FormHelperText sx={{color:"red"}}>{error}</FormHelperText>}
    </Box>





<StepNavigation action={handleSubmit} />


</Box>

}


export default Skills