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
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { post } from "../../api/client";

// Zod schema for validation
const experienceSchema = z
  .object({
    jobTitle: z.string().min(1, "Job title is required"),
    company: z.string().min(1, "Company is required"),
    currentlyWorking: z.boolean(),
    startDate: z.date({
      required_error: "Start date is required",
      invalid_type_error: "Invalid start date",
    }),
    endDate: z.date().optional(),
    description: z.string().optional(),
  });

type ExperienceFormData = z.infer<typeof experienceSchema>;

interface ExperiencePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExperiencePopup: React.FC<ExperiencePopupProps> = ({
  isOpen,
  onClose,
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
      startDate: undefined,
      endDate: undefined,
      description: "",
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const currentlyWorking = watch("currentlyWorking");
  const startDate = watch("startDate");
  const endDate = watch("endDate");

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const addExperience = await post("/profile/add-experience", { experience: [data] });
      if (addExperience) {
        return true;
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  // Handle the checkbox change to ensure the endDate is cleared when checked
  const handleCurrentlyWorkingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setValue("currentlyWorking", isChecked);

    // Reset end date if the checkbox is checked (currently working)
    if (isChecked) {
      setValue("endDate", undefined);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Experience</DialogTitle>
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
          {...register("startDate", { valueAsDate: true })}
          label="Start Date"
          type="date"
          fullWidth
          margin="dense"
          error={!!errors.startDate}
          helperText={errors.startDate?.message}
          InputLabelProps={{ shrink: true }}
        />
        {!currentlyWorking && (
          <TextField
            {...register("endDate", { valueAsDate: true })}
            label="End Date"
            type="date"
            fullWidth
            margin="dense"
            error={!!errors.endDate}
            helperText={errors.endDate?.message}
            InputLabelProps={{ shrink: true }}
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
