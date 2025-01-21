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
import { post, update } from "../../api/client";
import { IEducation } from "../../types/models/User";

// Refined Zod schema for validation
const educationSchema = z
  .object({
    university: z.string().min(1, "University name is required"),
    degree: z.string().min(1, "Degree is required"),
    field: z.string().min(1, "Field of study is required"),
    startYear: z
      .string()
      .min(1, "Start year is required")
      .refine((val) => !isNaN(Number(val)), "Start year must be a valid number")
      .refine(
        (val) => Number(val) >= 1900,
        "Start year must be greater than 1900"
      )
      .refine(
        (val) => Number(val) <= new Date().getFullYear(),
        "Start year cannot be in the future"
      ),
    endYear: z
      .string()
      .optional()
      .refine((val) => !val || !isNaN(Number(val)), "End year must be a valid number"),
  })
  .superRefine((data, ctx) => {
    if (data.endYear && Number(data.endYear) < Number(data.startYear)) {
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
  onSave: () => void;
  action:"update"|"add";
  data?:IEducation;
}

const EducationPopup: React.FC<EducationPopupProps> = ({ isOpen, onClose, onSave, action, data }) => {
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
      startYear: "",
      endYear: "",
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const startYear = watch("startYear");
  const endYear = watch("endYear");

  useEffect(() => {
    if (isOpen && action === "update" && data) {
      reset({
        university: data.university,
        degree: data.degree,
        field: data.field,
        startYear: String(data.startYear),
        endYear: data.endYear?String(data.endYear):"",
      });
    } else if (!isOpen) {
      reset({
        university: "",
        degree: "",
        field: "",
        startYear: "",
        endYear: "",
      })
    }
    
  }, [isOpen, action, data, reset]);

  const onSubmit = async (formData: EducationFormData) => {
    setIsLoading(true);
    setError("");
    try{
       if(action==="add"){
        await post("/profile/add-education", {education:formData}) 
       }else if(action === "update" && data?._id){
        await update(`/profile/update-education/${data._id}`, formData)
       }
       onSave();
       onClose();
     }catch(error:any){
      setError(error.message);
     }finally{
      setIsLoading(false);
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
          {...register("startYear")}
          label="Start Year"
          type="number"
          fullWidth
          margin="dense"
          error={!!errors.startYear}
          helperText={errors.startYear?.message}
          value={startYear || ""}
        />
        <TextField
          {...register("endYear")}
          label="End Year (or expected year)"
          type="number"
          fullWidth
          margin="dense"
          error={!!errors.endYear}
          helperText={errors.endYear?.message}
          value={endYear || ""}
        />
        {error && <FormHelperText sx={{ color: "red" }}>{error}</FormHelperText>}
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
