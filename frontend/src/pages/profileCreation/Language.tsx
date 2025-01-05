import { Box, FormHelperText, IconButton, MenuItem, Select, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import NavBar from "../../components/organisms/NavBar"
import StepNavigation from "../../components/molecules/StepNavigation"
import { useEffect, useState } from "react";
import Button from "../../components/atoms/Button";
import { post } from "../../api/client";
import useUserData from "../../hooks/useUserData";
import languagesList from "iso-language-codes";



interface Language {
_id: number;
language: string;
proficiency: string;
}

const Language:React.FC = ()=>{

   

const { userData, loading } = useUserData();    
const [languages, setLanguages] = useState<Language[]>([]);
const [error, setError] = useState<string>("") 


useEffect(() => {
  if (!loading && userData?.languages) {
    setLanguages([...userData?.languages])
  }
}, [userData, loading]);



const addLanguage = () => {
const newId = languages.length + 1;
setLanguages([...languages, { _id: newId, language: "", proficiency: "" }]);
};
    
const updateLanguage = (id: number, field: "language" | "proficiency", value: string) => {
setLanguages((prev) =>
prev.map((lang) => (lang._id === id ? { ...lang, [field]: value } : lang))
);
};
    
const removeLanguage = (id: number) => {
setLanguages((prev) => prev.filter((lang) => lang._id !== id));
};

const handleSubmit = async()=>{

if(languages.length===0){
setError("Please add a language");
return;
}   

try{

const addLanguages = await post("/profile/add-languages", {languages:languages}) 

if(addLanguages){
return true;
}

}catch(error:any){
setError(error.message)
}

}


return(
<Box
sx={{
display: 'flex',
flexDirection: 'column', 
height: '95vh',
}}
>

<NavBar/>

<>

<Box sx={{ maxWidth: 600, margin: "0 auto", padding: 2, 
marginTop:"10%",
marginBottom:"10%"
}}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Looking good. Next, tell us which languages you speak.
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 4 }}>
        Clients are often interested to know what languages you speak.
      </Typography>

      {languages.map((language) => (
        <Box
          key={language._id}
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: 2,
            gap: 2,
          }}
        >
          <Select
            value={language.language}
            onChange={(e) => updateLanguage(language._id, "language", e.target.value)}
            displayEmpty
            sx={{ flex: 1 }}
          >
            <MenuItem value="" disabled>
              Select a language
            </MenuItem>
            {languagesList.map((lang) => (
    <MenuItem key={lang.iso639_1} value={lang.name}>
      {lang.name}
    </MenuItem>
  ))}
          </Select>

          <Select
            value={language.proficiency}
            onChange={(e) => updateLanguage(language._id, "proficiency", e.target.value)}
            displayEmpty
            sx={{ flex: 1 }}
          >
            <MenuItem value="" disabled>
              My level is
            </MenuItem>
            <MenuItem value="Beginner">Beginner</MenuItem>
            <MenuItem value="Intermediate">Intermediate</MenuItem>
            <MenuItem value="Advanced">Advanced</MenuItem>
            <MenuItem value="Fluent">Fluent</MenuItem>
          </Select>

          {(
            <IconButton onClick={() => removeLanguage(language._id)} color="error">
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      ))}
    {/* Error Message */}
    {error && <FormHelperText sx={{color:"red"}}>{error}</FormHelperText>}
      <Button
        onClick={addLanguage}
        variant="outlined"
        color="primary"
        sx={{ display: "flex", alignItems: "center", marginTop: 2 }}
      >
        + Add a language
      </Button>
    </Box>



</>


<StepNavigation action={handleSubmit} />

</Box>)
} 

export default Language























