import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import {
  addUserBio,
  addUserEducation,
  addUserExperience,
  addUserHourlyRate,
  addUserJobTitle,
  addUserLanguages,
  addUserProfilePic,
  addUserService,
  addUserSkills,
  deleteUserEducation,
  deleteUserExperience,
  deleteUserLanguage,
  deleteUserSkill,
  updateUserAccount,
  updateUserEducation,
  updateUserExperience,
  updateUserLanguage,
} from "../services/user";

// update lastName, firstName, email, country, sector, companyName
const updateAccountInfo = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  const { lastName, firstName, email, country, sector, companyName } = req.body;

  try {
    await updateUserAccount(
      lastName,
      firstName,
      email,
      country,
      sector,
      companyName,
      user
    );
    res.status(200).json({ msg: "Account information updated successfully" });
    return;
  } catch (error: any) {
    next(error);
  }
};

const addService = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  const { service } = req.body;

  try {
    await addUserService(service, user);
    res.status(200).json({ msg: "Service added successfully" });
    return;
  } catch (error: any) {
    next(error);
  }
};

const addSkills = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  const { skills } = req.body;

  try {
    await addUserSkills(skills, user);
    res.status(200).json({ msg: "Skills added successfully" });
    return;
  } catch (error: any) {
    next(error);
  }
};

const addExperience = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  const { experience } = req.body;
  try {
    await addUserExperience(experience, user);
    res.status(200).json({ msg: "Experience added successfully" });
    return;
  } catch (error: any) {
    next(error);
  }
};

const addEducation = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  const { education } = req.body;

  try {
    await addUserEducation(education, user);
    res.status(200).json({ msg: "Education added successfully" });
    return;
  } catch (error: any) {
    next(error);
  }
};

const addLanguages = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  const { languages } = req.body;
  try {
    await addUserLanguages(languages, user);
    res.status(200).json({ msg: "Languages added successfully" });
    return;
  } catch (error: any) {
    next(error);
  }
};

const addBio = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  const { bio } = req.body;

  try {
    await addUserBio(bio, user);
    res.status(200).json({ msg: "Bio added successfully" });
    return;
  } catch (error: any) {
    next(error);
  }
};

const addJobTitle = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  const { jobTitle } = req.body;

  try {
    await addUserJobTitle(jobTitle, user);
    res.status(200).json({ msg: "Job Title added successfully" });
    return;
  } catch (error: any) {
    next(error);
  }
};

const addHourlyRate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  const { hourlyRate } = req.body;

  try {
    await addUserHourlyRate(hourlyRate, user);
    res.status(200).json({ msg: "Hourly Rate added successfully" });
    return;
  } catch (error: any) {
    next(error);
  }
};

const addProfilePic = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const profilPic = req.file?.filename;
  const user = req.user;
  try {
    await addUserProfilePic(profilPic, user);
    res.status(200).json({ msg: "Profile picture added successfully" });
    return;
  } catch (error: any) {
    next(error);
  }
};

const updateExperience = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  const { id } = req.params;
  const {
    jobTitle,
    company,
    currentlyWorking,
    startDate,
    endDate,
    description,
  } = req.body;

  try {
    await updateUserExperience(id, user, {
      jobTitle,
      company,
      currentlyWorking,
      startDate,
      endDate,
      description,
    });
    res.status(200).json({ msg: "Experience updated successfully" });
    return;
  } catch (error: any) {
    next(error);
  }
};

const updateEducation = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  const { id } = req.params;
  const { university, degree, field, startYear, endYear } = req.body;
  try {
    await updateUserEducation(id, user, {
      university,
      degree,
      field,
      startYear,
      endYear,
    });
    res.status(200).json({ msg: "Education updated successfully" });
    return;
  } catch (error: any) {
    next(error);
  }
};

const updateLanguage = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  const { id } = req.params;
  const { language, proficiency } = req.body;
  try {
    await updateUserLanguage(id, user, proficiency, language);
    res.status(200).json({ msg: "Language proficiency updated successfully" });
    return;
  } catch (error: any) {
    next(error);
  }
};

const getUserData = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  try {
    res.status(200).json({ user });
  } catch (error: any) {
    next(error);
  }
};

const deleteLanguage = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  try {
    const { id } = req.params;
    const user = req.user;
    await deleteUserLanguage(id, user);
    res.status(200).json({ msg: "Language deleted successfully" });
    return;
  } catch (error: any) {
    next(error);
  }
};

const deleteSkill = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  const { skill } = req.params;

  try {
    await deleteUserSkill(skill, user);
    res.status(200).json({ msg: "Skill deleted successfully" });
    return;
  } catch (error: any) {
    next(error);
  }
};

const deleteEducation = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  const { id } = req.params;

  try {
    await deleteUserEducation(id, user);
    res.status(200).json({ msg: "Education entry deleted successfully" });
    return;
  } catch (error: any) {
    next(error);
  }
};

const deleteExperience = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  const { id } = req.params;

  try {
    await deleteUserExperience(id, user);
    res.status(200).json({ msg: "Experience entry deleted successfully" });
    return;
  } catch (error: any) {
    next(error);
  }
};

export {
  addService,
  addSkills,
  addExperience,
  addEducation,
  addLanguages,
  addBio,
  addJobTitle,
  addHourlyRate,
  addProfilePic,
  updateExperience,
  updateEducation,
  updateLanguage,
  getUserData,
  deleteLanguage,
  deleteSkill,
  deleteEducation,
  deleteExperience,
  updateAccountInfo,
};
