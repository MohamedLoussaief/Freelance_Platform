import {
  Box,
  FormHelperText,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import NavBar from "../../components/organisms/NavBar";
import StepNavigation from "../../components/molecules/StepNavigation";
import { useEffect, useState } from "react";
import Button from "../../components/atoms/Button";
import axios from "axios";
import languagesList from "iso-language-codes";
import { useUser } from "../../context/UserContext";

interface Language {
  _id: number;
  language: string;
  proficiency: string;
}

const Language: React.FC = () => {
  const { userData, loading } = useUser();
  const [existingLanguages, setExistingLanguages] = useState<Language[]>([]);
  const [newLanguages, setNewLanguages] = useState<Language[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!loading && userData?.languages) {
      setExistingLanguages([...userData.languages]);
    }
  }, [userData, loading]);

  // Add a new language
  const addLanguage = () => {
    const newId = Math.max(...existingLanguages.map((lang) => lang._id), 0) + 1;
    setNewLanguages((prev) => [
      ...prev,
      { _id: newId, language: "", proficiency: "" },
    ]);
  };

  // Update a language (either existing or new)
  const updateLanguage = async (
    id: number,
    field: "language" | "proficiency",
    value: string
  ) => {
    const isExistingLanguage = existingLanguages.some(
      (lang) => lang._id === id
    );

    if (isExistingLanguage) {
      const updatedLanguages = existingLanguages.map((lang) =>
        lang._id === id ? { ...lang, [field]: value } : lang
      );
      setExistingLanguages(updatedLanguages);

      const updatedLanguage = updatedLanguages.find((lang) => lang._id === id);
      if (updatedLanguage) {
        await axios.patch(`/profile/update-language/${id}`, updatedLanguage);
      }
    } else {
      setNewLanguages((prev) =>
        prev.map((lang) =>
          lang._id === id ? { ...lang, [field]: value } : lang
        )
      );
    }
  };

  // Remove a language (either existing or new)
  const removeLanguage = async (id: number) => {
    const isExistingLanguage = existingLanguages.some(
      (lang) => lang._id === id
    );

    if (isExistingLanguage) {
      try {
        await axios.delete(`/profile/delete-language/${id}`);
        setExistingLanguages((prev) => prev.filter((lang) => lang._id !== id));
      } catch (error: any) {
        setError(error.message);
      }
    } else {
      setNewLanguages((prev) => prev.filter((lang) => lang._id !== id));
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    setError("");
    setIsLoading(true);

    if (existingLanguages.length === 0 && newLanguages.length === 0) {
      setError("Please add a language");
      setIsLoading(false);
      return;
    }

    const hasEmptyProficiency = [...existingLanguages, ...newLanguages].some(
      (lang) => !lang.proficiency
    );

    const hasEmptyLanguage = [...existingLanguages, ...newLanguages].some(
      (lang) => !lang.language
    );

    if (hasEmptyProficiency) {
      setError("Please select a proficiency level for all languages");
      setIsLoading(false);
      return;
    }

    if (hasEmptyLanguage) {
      setError("Please select a language.");
      setIsLoading(false);
      return;
    }

    try {
      // Submit only new languages
      const addLanguages = await axios.post("/profile/add-languages", {
        languages: newLanguages,
      });
      if (addLanguages) {
        return true;
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const languages = [...existingLanguages, ...newLanguages];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "95vh" }}>
      <NavBar />

      <Box
        sx={{
          maxWidth: 600,
          margin: "0 auto",
          padding: 2,
          marginTop: "10%",
          marginBottom: "10%",
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Looking good. Next, tell us which languages you speak.
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: 4 }}
        >
          Clients are often interested to know what languages you speak.
        </Typography>

        {languages.map((language) => (
          <Box
            key={language._id}
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: 2,
              gap: 2,
            }}
          >
            <Select
              value={language.language}
              onChange={(e) =>
                updateLanguage(language._id, "language", e.target.value)
              }
              displayEmpty
              sx={{ flex: 1 }}
            >
              <MenuItem value="" disabled>
                Select a language
              </MenuItem>
              {languagesList.map((lang) => (
                <MenuItem key={lang.iso639_1} value={lang.name}>
                  {lang.name}
                </MenuItem>
              ))}
            </Select>

            <Select
              value={language.proficiency}
              onChange={(e) =>
                updateLanguage(language._id, "proficiency", e.target.value)
              }
              displayEmpty
              sx={{ flex: 1 }}
            >
              <MenuItem value="" disabled>
                My level is
              </MenuItem>
              <MenuItem value="Beginner">Beginner</MenuItem>
              <MenuItem value="Intermediate">Intermediate</MenuItem>
              <MenuItem value="Advanced">Advanced</MenuItem>
              <MenuItem value="Fluent">Fluent</MenuItem>
            </Select>

            <IconButton
              onClick={() => removeLanguage(language._id)}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}

        {error && (
          <FormHelperText sx={{ color: "red" }}>{error}</FormHelperText>
        )}

        <Button
          onClick={addLanguage}
          variant="outlined"
          color="primary"
          sx={{ display: "flex", alignItems: "center", marginTop: 2 }}
        >
          + Add a language
        </Button>
      </Box>

      <StepNavigation action={handleSubmit} isLoading={isLoading} />
    </Box>
  );
};

export default Language;
