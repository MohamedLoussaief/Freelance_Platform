import { Box, Typography } from "@mui/material"
import NavBar from "../../components/organisms/NavBar"
import { useState } from "react";
import useUserData from "../../hooks/useUserData";
import Card from "../../components/molecules/Card";
import StepNavigation from "../../components/molecules/StepNavigation";
import EducationPopup from "../../components/organisms/EducationPopup";



const Experience: React.FC = ()=>{

const { userData, fetchUserData, loading } = useUserData();      
const [isDialogOpen, setIsDialogOpen] = useState(false);    
const handleOpenDialog = () => setIsDialogOpen(true);
const handleCloseDialog = () => setIsDialogOpen(false);



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
      {/* Add Education Section */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={4}
        p={4}
        maxWidth="600px"
        mx="auto"
        marginTop={"5%"}
        marginBottom={"5%"}
        textAlign="center"
      >
        
        {/* Title */}
        <Typography variant="h6" fontWeight="bold">
          Clients like to know what you know - add your education here
        </Typography>



      <Box
      display="flex"
      flexDirection="row"
      flexWrap="nowrap" // Prevent wrapping to new lines
      justifyContent="flex-start"
      alignItems="flex-start"
      gap={3} // Add space between items
      p={3} // Padding for the container
      sx={{
        width: "100%", // Full width of the parent container
        overflowX: "auto", // Horizontal scroll for overflow
        borderRadius: "8px",
      }}
      >
      {/* Add Experience Card */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        border="1px dashed #ccc"
        borderRadius="8px"
        p={4}
        width="300px" // Same width as the cards
        height="120px"
        sx={{
          cursor: "pointer",
          transition: "0.3s",
          "&:hover": { backgroundColor: "#f9f9f9" },
          flexShrink: 0, // Prevent shrinking
        }}
        onClick={handleOpenDialog}
      >
        <Typography variant="h5" fontWeight="bold" mt={1}>
          +
        </Typography>
        <Typography variant="subtitle1" fontWeight="bold" mt={1}>
          Add Education
        </Typography>
      </Box>

      {/* Experience Cards */}
      {loading?<></>:userData?.education.map((edu: any) => (
        <Card education={edu} key={edu?._id} />
      )) }
    </Box>



      </Box>


{ /* Add Education Popup */ }
<EducationPopup 
isOpen={isDialogOpen}
onClose={handleCloseDialog}
onSave={fetchUserData}
/>


</>


<StepNavigation action={()=>{return true}} />

</Box> )


}

export default Experience
























