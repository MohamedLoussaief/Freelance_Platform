import React from "react";
import { Button } from "@mui/material";

interface ButtonAtomProps {
  type?: "button" | "submit" | "reset"; // Add the type prop
  variant?: "text" | "outlined" | "contained";
  color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  sx?: object;
}

const ButtonAtom: React.FC<ButtonAtomProps> = ({
  type = "button", // Default type
  variant = "contained",
  color = "primary",
  onClick,
  children,
  disabled = false,
  sx,
}) => {
  return (
    <Button
      type={type} // Pass the type prop
      variant={variant}
      color={color}
      onClick={onClick}
      disabled={disabled}
      sx={{
        textTransform: "none",
        fontWeight: "bold",
        ...sx, // Allow custom styles to be passed
      }}
    >
      {children}
    </Button>
  );
};

export default ButtonAtom;
