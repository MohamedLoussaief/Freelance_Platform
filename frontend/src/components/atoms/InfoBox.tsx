import React from "react";
import InfoIcon from "@mui/icons-material/Info";

interface InfoBoxProps {
  message: string;
}

const InfoBox: React.FC<InfoBoxProps> = ({ message }) => {
  return (
    <div
      className="flex items-start gap-2 bg-yellow-50 border border-yellow-200
     text-yellow-800 text-sm p-3 rounded-md"
    >
      <InfoIcon className="text-yellow-600 mt-0.5" fontSize="small" />
      <p>{message}</p>
    </div>
  );
};

export default InfoBox;
