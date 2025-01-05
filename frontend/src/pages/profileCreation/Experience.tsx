import { Box, Typography } from "@mui/material";
import NavBar from "../../components/organisms/NavBar";
import StepNavigation from "../../components/molecules/StepNavigation";
import { useState } from "react";
import ExperiencePopup from "../../components/organisms/ExperiencePopup";
import useUserData from "../../hooks/useUserData";
import Card from "../../components/molecules/Card";


const Experience:React.FC = ()=>{

const { userData, loading } = useUserData();  
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
      {/* Add Experience Section */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={2}
        p={4}
        maxWidth="600px"
        mx="auto"
        textAlign="center"
      >
        
        {/* Title */}
        <Typography variant="h5" fontWeight="bold">
          If you have relevant work experience, add it here.
        </Typography>

        {/* Subtitle */}
        <Typography variant="body1" color="textSecondary">
          Freelancers who add their experience are twice as likely to win work.
          But if you’re just starting out, you can still create a great profile.
          Just head on to the next page.
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
          Add Experience
        </Typography>
      </Box>

      {/* Experience Cards */}
      {userData?.experience.map((exp: any) => (
        <Card experience={exp} key={exp._id} />
      ))}
    </Box>



      </Box>

      {/* Add Experience Popup */}
      <ExperiencePopup
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
      />
</>


<StepNavigation action={()=>{return true}} />


</Box>
)


}


export default Experience;


























