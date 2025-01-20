import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormControlLabel,
  Checkbox,
  DialogActions,
  Button,
  CircularProgress,
  FormHelperText,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { post, update } from "../../api/client";
import { IExperience } from "../../types/models/User";

// Zod schema for validation 
const experienceSchema = z.object({
  jobTitle: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company is required"),
  currentlyWorking: z.boolean(),
  startDate: z.string().nonempty("Start date is required"),
  endDate: z.string().optional(),
  description: z.string().optional(),
}).refine((data) => data.currentlyWorking || (data.endDate), 
{
  message: "End date is required",
  path: ["endDate"],
})
.refine(
  (data) =>
    data.currentlyWorking || (data.endDate && data.startDate < data.endDate),
  {
    message: "End date must be after start date",
    path: ["endDate"],
  }
);

type ExperienceFormData = z.infer<typeof experienceSchema>;

interface ExperiencePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  action:"update"|"add";
  data?:IExperience;
}

const ExperiencePopup: React.FC<ExperiencePopupProps> = ({
  isOpen,
  onClose,
  onSave,
  action,
  data
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      jobTitle: "",
      company: "",
      currentlyWorking: false,
      startDate: "",
      endDate: "",
      description: "",
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const currentlyWorking = watch("currentlyWorking");
  const startDate = watch("startDate");
  const endDate = watch("endDate");

  useEffect(() => {
    if (isOpen && action === "update" && data) {
      reset({
        jobTitle: data.jobTitle,
        company: data.company,
        currentlyWorking: data.currentlyWorking,
        startDate: data.startDate?.split("T")[0],
        endDate: data.endDate?.split("T")[0],
        description: data.description,
      });
    } else if (!isOpen) {
      reset({
        jobTitle: "",
        company: "",
        currentlyWorking: false,
        startDate: "",
        endDate: "",
        description: "",
      });
    }
  }, [isOpen, action, data, reset]);



  const onSubmit = async (formData: ExperienceFormData) => {
    setIsLoading(true);
    setError("");
    
    // Convert string dates to Date objects before submitting
    const payload = {
      ...formData,
      startDate: new Date(formData.startDate),
      endDate: formData.endDate ? new Date(formData.endDate) : undefined,
    };

    try {
      if (action === "add") {
        await post("/profile/add-experience", { experience: [payload] });
      } else if (action === "update" && data?._id) {
        await update(`/profile/update-experience/${data._id}`, payload);
      }
      onSave();
      onClose();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };


  const handleCurrentlyWorkingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setValue("currentlyWorking", isChecked);

    // Reset end date if the checkbox is checked (currently working)
    if (isChecked) {
      setValue("endDate", "");
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Experience</DialogTitle>
      <DialogContent dividers>
        <TextField
          {...register("jobTitle")}
          label="Job Title"
          fullWidth
          margin="dense"
          error={!!errors.jobTitle}
          helperText={errors.jobTitle?.message}
        />
        <TextField
          {...register("company")}
          label="Company"
          fullWidth
          margin="dense"
          error={!!errors.company}
          helperText={errors.company?.message}
        />
        <FormControlLabel
          control={
            <Checkbox
              {...register("currentlyWorking")}
              checked={currentlyWorking}
              onChange={handleCurrentlyWorkingChange}
            />
          }
          label="I currently work here"
        />
        
        <TextField
          {...register("startDate")}
          label="Start Date"
          type="date"
          fullWidth
          margin="dense"
          error={!!errors.startDate}
          helperText={errors.startDate?.message}
          InputLabelProps={{ shrink: true }}
          value={startDate || ""}
          inputProps={{
            max: new Date().toISOString().split("T")[0],
          }}
        />
        {!currentlyWorking && (
          <TextField
            {...register("endDate")}
            label="End Date"
            type="date"
            fullWidth
            margin="dense"
            error={!!errors.endDate}
            helperText={errors.endDate?.message}
            InputLabelProps={{ shrink: true }}
            value={endDate || ""}
            inputProps={{
              max: new Date().toISOString().split("T")[0], 
            }}
          />
        )}

        <TextField
          {...register("description")}
          label="Description"
          multiline
          rows={4}
          fullWidth
          margin="dense"
          error={!!errors.description}
          helperText={errors.description?.message}
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

export default ExperiencePopup;