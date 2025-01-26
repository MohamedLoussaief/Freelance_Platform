import { Box, FormHelperText, TextField, Typography } from "@mui/material";
import NavBar from "../../components/organisms/NavBar";
import { useEffect, useState } from "react";
import StepNavigation from "../../components/molecules/StepNavigation";
import { update } from "../../api/client";
import { useUser } from "../../context/UserContext";

const Bio: React.FC = () => {
  const { userData, loading } = useUser();
  const [bio, setBio] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!loading && userData?.bio) {
      setBio(userData?.bio);
    }
  }, [userData, loading]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length > 2000) {
      setError("The bio cannot exceed 2000 characters.");
      return;
    }
    setBio(value);
    setError("");
  };

  const handleBlur = () => {
    if (bio.length < 100) {
      setError("The bio must be at least 100 characters.");
    } else {
      setError("");
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    if (bio.trim() === "") {
      setError("Please enter your bio.");
      setIsLoading(false);
      return;
    }

    try {
      const addbio = await update("/profile/bio", { bio });

      if (addbio) {
        return true;
      }
    } catch (error: any) {
      setError(error.errors.bio);
    } finally {
      setIsLoading(false);
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
        marginTop={"5%"}
        marginBottom={"5%"}
        border="1px solid #ddd"
        borderRadius="8px"
        boxShadow="0 2px 10px rgba(0, 0, 0, 0.1)"
      >
        {/* Bio */}
        <Typography variant="h5" fontWeight="bold" textAlign="center">
          Great. Now write a bio to tell the world about yourself.
        </Typography>

        <TextField
          label="Bio"
          multiline
          rows={6}
          fullWidth
          value={bio}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
          error={!!error}
          helperText={error || `${bio.length}/2000 characters`}
          inputProps={{
            maxLength: 2000,
          }}
        />
        {/* Error Message */}
        {error && (
          <FormHelperText sx={{ color: "red" }}>{error}</FormHelperText>
        )}
      </Box>

      <StepNavigation action={handleSubmit} isLoading={isLoading} />
    </Box>
  );
};

export default Bio;
