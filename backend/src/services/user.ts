import {
  Education,
  Experience,
  IUser,
  Language,
  Proficiency,
  Service,
} from "../models/user";
import CustomError from "../utils/CustomError";

const addUserService = async (service: Service, user: IUser) => {
  if (!service) {
    throw new CustomError("Please select a field of work", 400);
  }

  user.service = service;
  await user.save();
};

const addUserSkills = async (skills: string[], user: IUser) => {
  if (
    !Array.isArray(skills) ||
    skills.some((skill) => typeof skill !== "string")
  ) {
    throw new CustomError("Skills must be an array of strings.", 400);
  }

  if (skills.length === 0) {
    throw new CustomError("Please provide skills", 400);
  }

  const currentSkills = user.skills || [];

  const updatedSkills = Array.from(new Set([...currentSkills, ...skills]));

  user.skills = updatedSkills;

  await user.save();
};

const addUserExperience = async (experience: Experience[], user: IUser) => {
  if (
    !Array.isArray(experience) ||
    experience.some((exp) => typeof exp !== "object" || exp === null)
  ) {
    throw new CustomError("Experience must be an array of objects.", 400);
  }

  if (experience.length === 0) {
    throw new CustomError("Please provide an experience", 400);
  }
  const currentExperience = user.experience || [];

  const updatedExperience = Array.from(
    new Set([...currentExperience, ...experience])
  );

  user.experience = updatedExperience;

  await user.save();
};

const addUserEducation = async (education: Education, user: IUser) => {
  const currentEducation = user.education || [];

  const addEducation = [...currentEducation, education];

  user.education = addEducation;

  await user.save();
};

const addUserLanguages = async (languages: Language, user: IUser) => {
  const currentLanguage = user.languages || [];

  const addLanguage = [...currentLanguage, languages];

  user.languages = addLanguage;

  await user.save();
};

const addUserBio = async (bio: string, user: IUser) => {
  if (!bio) {
    throw new CustomError("This field is required.", 400);
  }

  user.bio = bio;
  await user.save();
};

const addUserJobTitle = async (jobTitle: string, user: IUser) => {
  if (!jobTitle) {
    throw new CustomError("This field is required.", 400);
  }

  user.jobTitle = jobTitle;
  await user.save();
};

const addUserHourlyRate = async (hourlyRate: number, user: IUser) => {
  user.hourlyRate = hourlyRate;
  await user.save();
};

const addUserProfilePic = async (
  profilPic: string | undefined,
  user: IUser
) => {
  if (!profilPic) {
    throw new CustomError("Please provide a profile picture", 400);
  }
  user.profilPicture = profilPic;
  await user.save();
};

const updateUserExperience = async (
  expId: string,
  user: IUser,
  updatedExperience: Experience
) => {
  if (!user.experience || user.experience.length === 0) {
    throw new CustomError("No experience found for this user", 400);
  }

  const experienceIndex = user.experience?.findIndex((exp) => exp.id === expId);
  if (experienceIndex === -1) {
    throw new CustomError("Experience not found", 400);
  }

  user.experience[experienceIndex] = {
    ...user.experience[experienceIndex],
    ...updatedExperience,
  };

  await user.save();
};

const updateUserEducation = async (
  edId: string,
  user: IUser,
  updatedEducation: Education
) => {
  if (!user.education || user.education.length === 0) {
    throw new CustomError("No education found for this user", 400);
  }

  const educationIndex = user.education?.findIndex((edu) => edu.id === edId);
  if (educationIndex === -1) {
    throw new CustomError("Education not found", 400);
  }

  user.education[educationIndex] = {
    ...user.education[educationIndex],
    ...updatedEducation,
  };

  await user.save();
};

const updateUserLanguage = async (
  languageId: string,
  user: IUser,
  proficiency: Proficiency
) => {
  if (!user.languages || user.languages.length === 0) {
    throw new CustomError("No language found for this user", 400);
  }

  const languageIndex = user.languages?.findIndex(
    (lan) => lan.id === languageId
  );
  if (languageIndex === -1) {
    throw new CustomError("Language not found", 400);
  }

  user.languages[languageIndex].proficiency = proficiency;

  await user.save();
};

export {
  addUserSkills,
  addUserExperience,
  addUserEducation,
  addUserLanguages,
  addUserBio,
  addUserJobTitle,
  addUserHourlyRate,
  addUserProfilePic,
  updateUserExperience,
  updateUserEducation,
  updateUserLanguage,
  addUserService,
};
