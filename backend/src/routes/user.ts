import { Router } from "express";
import {
  addBio,
  addEducation,
  addExperience,
  addHourlyRate,
  addJobTitle,
  addLanguages,
  addProfilePic,
  addSkills,
  updateEducation,
  updateExperience,
  updateLanguage,
} from "../controllers/user";
import { requireAuth } from "../middlewares/authMiddleware";
import uploadFile from "../middlewares/uploadFile";

const router = Router();

const upload = uploadFile("images");

router.use(requireAuth);

router.put("/skills", addSkills);

router.post("/experience", addExperience);

router.post("/education", addEducation);

router.post("/languages", addLanguages);

router.put("/bio", addBio);

router.put("/jobTitle", addJobTitle);

router.put("/addHourlyRate", addHourlyRate);

router.put("/profilePicture", upload.single("profilePicture"), addProfilePic);

router.put("/updateExperience/:id", updateExperience);

router.put("/updateEducation/:id", updateEducation);

router.put("/updateLanguage/:id", updateLanguage);

export default router;
