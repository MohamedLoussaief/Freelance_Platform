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

router.put("/add-skills", addSkills);

router.post("/add-experience", addExperience);

router.post("/add-education", addEducation);

router.post("/add-languages", addLanguages);

router.put("/bio", addBio);

router.put("/job-title", addJobTitle);

router.put("/hourly-rate", addHourlyRate);

router.put("/profile-picture", upload.single("profilePicture"), addProfilePic);

router.put("/update-experience/:id", updateExperience);

router.put("/update-education/:id", updateEducation);

router.put("/update-language/:id", updateLanguage);

export default router;
