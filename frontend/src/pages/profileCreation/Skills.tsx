import {
  Box,
  Chip,
  CircularProgress,
  FormHelperText,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import StepNavigation from "../../components/molecules/StepNavigation";
import NavBar from "../../components/organisms/NavBar";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import {
  ADD_FREELANCER_SKILL,
  DELETE_FREELANCER_SKILL,
} from "../../utils/mutations/skillsMutations";
import { GET_FREELANCER_SKILLS } from "../../utils/queries/freelancerQueries";
import { GetFreelancerResponse } from "../../utils/types/freelancerInterface";

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string>();

  const [assignSkill, { error: assignError, loading }] =
    useMutation(ADD_FREELANCER_SKILL);

  const {
    data,
    loading: loading1,
    error: error1,
  } = useQuery<GetFreelancerResponse>(GET_FREELANCER_SKILLS, {
    fetchPolicy: "network-only",
  });

  const [deleteFreelancerSkill, { loading: loading2, error: removeError }] =
    useMutation(DELETE_FREELANCER_SKILL);

  useEffect(() => {
    if (!loading1 && !error1 && data?.freelancer.skills) {
      setSkills(data?.freelancer.skills.map((skill) => skill.name));
    }
  }, [loading1, data]);

  const addSkill = (newSkill: string) => {
    if (newSkill && !skills.includes(newSkill) && skills.length < 15) {
      setSkills([...skills, newSkill]);
    }
    setInputValue(""); // Clear input
  };

  const removeSkill = async (skillToRemove: string) => {
    try {
      await deleteFreelancerSkill({
        variables: {
          skillName: skillToRemove,
        },
      });
      setSkills(skills.filter((skill) => skill !== skillToRemove));
    } catch (error: any) {
      setError(error.message || "Something went wrong");
    }
  };

  const handleSubmit = async () => {
    if (skills.length === 0) {
      setError("Please add skills");
      return;
    }

    try {
      await assignSkill({
        variables: { skillsInput: skills.map((name) => ({ name })) },
      });
      return true;
    } catch (error: any) {
      setError(error.message || "Something went wrong");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column", // Stack items vertically
        height: "95vh", // Full viewport height
      }}
    >
      <NavBar />

      <Box
        sx={{
          width: "100%",
          maxWidth: "600px",
          margin: "auto",
          marginBottom: "10%",
          marginTop: "10%",
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Nearly there! What work are you here to do?
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Your skills show clients what you can offer and help us choose which
          jobs to recommend to you. Add or remove the ones we’ve suggested, or
          start typing to pick more. It’s up to you.
        </Typography>
        <Typography
          variant="body2"
          color="primary"
          sx={{ cursor: "pointer", mb: 2 }}
        >
          Why choosing carefully matters
        </Typography>
        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
          Your skills
        </Typography>
        {!loading1 ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1,
              border: "1px solid #ccc",
              borderRadius: 1,
              padding: 1,
            }}
          >
            {/* Render Chips */}
            {skills.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                onDelete={!loading2 ? () => removeSkill(skill) : undefined}
                color="primary"
                variant="outlined"
              />
            ))}

            {/* Input for adding skills */}
            <TextField
              variant="standard"
              placeholder={skills.length < 15 ? "Enter skills here" : ""}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill(inputValue.trim());
                }
              }}
              InputProps={{
                disableUnderline: true,
                endAdornment: (
                  <InputAdornment position="end">
                    {skills.length}/15
                  </InputAdornment>
                ),
              }}
              sx={{
                flex: 1,
                minWidth: "120px",
                "& .MuiInputBase-input": {
                  padding: "4px",
                },
              }}
            />
          </Box>
        ) : (
          <div className="flex justify-center items-center h-10">
            <CircularProgress size={40} sx={{ color: "blue" }} />
          </div>
        )}{" "}
        <Typography
          variant="caption"
          color={skills.length === 15 ? "error" : "text.secondary"}
          sx={{ mt: 1, display: "block" }}
        >
          Max 15 skills
        </Typography>
        {/* Error Message */}
        {(error || assignError || removeError) && (
          <FormHelperText sx={{ color: "red" }}>
            {error || assignError?.message || removeError?.message}
          </FormHelperText>
        )}
      </Box>

      <StepNavigation action={handleSubmit} isLoading={loading} />
    </Box>
  );
};

export default Skills;
