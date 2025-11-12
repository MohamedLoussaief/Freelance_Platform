import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import NavBar from "../../components/organisms/NavBar";
import StepNavigation from "../../components/molecules/StepNavigation";
import { useMutation, useQuery } from "@apollo/client/react";
import { GET_FREELANCER_JOBTITLE } from "../../utils/queries/freelancerQueries";
import { GetFreelancerResponse } from "../../utils/types/freelancerInterface";
import { ADD_FREELANCER_JOBTITLE } from "../../utils/mutations/jobTitleMutations";

const JobTitle: React.FC = () => {
  const [jobTitle, setJobTitle] = useState<string>("");
  const [error, setError] = useState<string>("");
  const {
    data,
    loading: getLoading,
    error: getError,
  } = useQuery<GetFreelancerResponse>(GET_FREELANCER_JOBTITLE, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (!getLoading && !getError && data?.freelancer.jobTitle) {
      setJobTitle(data.freelancer.jobTitle);
    }
  }, [getLoading, data]);

  const [addJobTitle, { error: addError, loading: addLoading }] = useMutation(
    ADD_FREELANCER_JOBTITLE
  );

  const handleSubmit = async () => {
    if (jobTitle.trim() === "") {
      setError("Please enter a job title.");
      return;
    }

    try {
      await addJobTitle({ variables: { jobTitleInput: { jobTitle } } });
      return true;
    } catch (error: any) {
      setError(error.message || "Something went wrong");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "95vh",
      }}
    >
      <NavBar />

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
        p={4}
        maxWidth="400px"
        mx="auto"
        marginTop={"10%"}
        marginBottom={"10%"}
        border="1px solid #ddd"
        borderRadius="8px"
        boxShadow="0 2px 10px rgba(0, 0, 0, 0.1)"
      >
        {/* Title */}
        <Typography variant="h5" fontWeight="bold" textAlign="center">
          Got it. Now, add a title to tell the world what you do.
        </Typography>

        {/* Small Title */}
        <Typography
          variant="subtitle1"
          color="textSecondary"
          textAlign="center"
        >
          Your job title.
        </Typography>

        {/* TextField */}
        {!getLoading ? (
          <TextField
            label="Job Title"
            variant="outlined"
            fullWidth
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            error={!!error}
            helperText={error}
          />
        ) : (
          <div className="flex justify-center items-center h-10">
            <CircularProgress size={40} sx={{ color: "blue" }} />
          </div>
        )}
      </Box>

      <StepNavigation action={handleSubmit} isLoading={addLoading} />
    </Box>
  );
};

export default JobTitle;
