import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  CircularProgress,
  FormHelperText,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { post } from "../../api/client";

// Refined Zod schema for validation
const educationSchema = z
  .object({
    university: z.string().min(1, "University name is required"),
    degree: z.string().min(1, "Degree is required"),
    field: z.string().min(1, "Field of study is required"),
    startYear: z
      .number({
        required_error: "Start year is required",
        invalid_type_error: "Start year must be a valid number",
      })
      .min(1900, "Start year must be greater than 1900")
      .max(new Date().getFullYear(), "Start year cannot be in the future"),
    endYear: z
      .number({
        invalid_type_error: "End year must be a valid number",
      })
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.endYear && data.endYear < data.startYear) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endYear"],
        message: "End year must be after or equal to the start year",
      });
    }
  });

type EducationFormData = z.infer<typeof educationSchema>;

interface EducationPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const EducationPopup: React.FC<EducationPopupProps> = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      university: "",
      degree: "",
      field: "",
      startYear: undefined,
      endYear: undefined,
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const startYear = watch("startYear");

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = async (data: EducationFormData) => {
    setIsLoading(true);
    try {
  const addEducation = await post("/profile/add-education", {education:data}) 
  if(addEducation){
      return true;
    }
    } catch (error:any) {
      setError(error.message)
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Education</DialogTitle>
      <DialogContent dividers>
        <TextField
          {...register("university")}
          label="University"
          fullWidth
          margin="dense"
          error={!!errors.university}
          helperText={errors.university?.message}
        />
        <TextField
          {...register("degree")}
          label="Degree"
          fullWidth
          margin="dense"
          error={!!errors.degree}
          helperText={errors.degree?.message}
        />
        <TextField
          {...register("field")}
          label="Field of Study"
          fullWidth
          margin="dense"
          error={!!errors.field}
          helperText={errors.field?.message}
        />
        <TextField
          {...register("startYear", { valueAsNumber: true })}
          label="Start Year"
          type="number"
          fullWidth
          margin="dense"
          error={!!errors.startYear}
          helperText={errors.startYear?.message}
        />
        <TextField
          {...register("endYear", { valueAsNumber: true })}
          label="End Year (or expected year)"
          type="number"
          fullWidth
          margin="dense"
          error={!!errors.endYear}
          helperText={errors.endYear?.message}
        />
       {/* Error Message */}
       {error && <FormHelperText>{error}</FormHelperText>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
          color="primary"
          variant="contained"
        >
          {isLoading ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            "Save"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EducationPopup;
