import React, { Dispatch, SetStateAction } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import { IconButton } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IExperience } from "../../types/models/User";

const Card: React.FC<{ experience?:IExperience; education?: any,
   remove:(id: string) => Promise<void>, 
   expId:string,
   setExp?:Dispatch<SetStateAction<IExperience | undefined>>,
   setAction:Dispatch<SetStateAction<"update"|"add">>,
   openDialog:() => void 
  }> = ({
  experience,
  education,
  remove,
  expId,
  setExp,
  setAction,
  openDialog
}) => {
  const formatDate = (dateString: string): string => {
    return format(new Date(dateString), "MMMM yyyy");
  };

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "300px", 
        backgroundColor: "#fff",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        flexShrink: 0, 
        position:"relative"
      }}
    >


      {/* Edit and Delete Icons */}
      <Box
        sx={{
          position: "absolute",
          top: "8px",
          right: "8px",
          display: "flex",
          flexDirection:"column",
          gap: "8px",
        }}
      >
        <IconButton
          size="small"
          color="primary"
          onClick={() =>{setExp&&setExp(experience);
            setAction("update");openDialog();} }
        >
          <EditOutlinedIcon />
        </IconButton>
        <IconButton
          size="small"
          color="primary"
          onClick={()=>{remove(expId)}}
        >
          <DeleteOutlineIcon />
        </IconButton>
      </Box>




      <Box
        sx={{
          width: "50px",
          height: "50px",
          //backgroundColor: "green",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "4px",
          marginBottom: "8px",
        }}
      >
        <Typography variant="h4" color="white">
          📁
        </Typography>
      </Box>
      <Typography variant="h6" sx={{ fontWeight: "bold", 
        marginBottom: "4px", 
        width: "50%", 
        whiteSpace: "nowrap", 
        overflow: "hidden", 
        textOverflow: "ellipsis", 
        textAlign: "center",
        }}>
        {experience?.jobTitle} {education?.university}
      </Typography>


      {experience&&<><Typography variant="body2" color="text.secondary" sx={{ marginBottom: "8px",
                width: "100%", 
                overflow: "hidden", 
                textOverflow: "ellipsis", 
                textAlign: "center"
       }}>
        {experience?.company} {"  "} | {"  "}
        {experience?.startDate && formatDate(experience.startDate)} {"  "} 
        {experience?.endDate && `- ${formatDate(experience.endDate)}`}{"  "} 
      </Typography></>}


      {education&&<><Typography>
       {education?.degree} {"  "} | {"  "} {education?.startYear}  {education?.endYear&&`- ${education?.endYear}`}
      </Typography></>}
      

      <Typography variant="body2" color="text.secondary" sx={{
        width: "100%", 
        whiteSpace: "nowrap", 
        overflow: "hidden", 
        textOverflow: "ellipsis", 
        textAlign: "center",
      }}>
        {experience?.description} {education?.field}
      </Typography>
    </Box>
  );
};

export default Card;
