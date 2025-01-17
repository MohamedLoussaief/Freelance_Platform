"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserExperience = exports.deleteUserEducation = exports.deleteUserSkill = exports.deleteUserLanguage = exports.addUserService = exports.updateUserLanguage = exports.updateUserEducation = exports.updateUserExperience = exports.addUserProfilePic = exports.addUserHourlyRate = exports.addUserJobTitle = exports.addUserBio = exports.addUserLanguages = exports.addUserEducation = exports.addUserExperience = exports.addUserSkills = exports.updateUserAccount = void 0;
const CustomError_1 = __importDefault(require("../utils/CustomError"));
const user_1 = __importDefault(require("../models/user"));
const updateUserAccount = (lastName, firstName, email, country, sector, companyName, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!lastName || !firstName || !email || !country) {
        throw new CustomError_1.default("All required fields must be provided", 400);
    }
    const existingUser = yield user_1.default.findOne({ email });
    if (existingUser) {
        throw new CustomError_1.default("This email is already in use", 409);
    }
    user.lastName = lastName;
    user.firstName = firstName;
    user.email = email;
    user.country = country;
    if (sector)
        user.sector = sector;
    if (companyName)
        user.companyName = companyName;
    yield user.save();
});
exports.updateUserAccount = updateUserAccount;
const addUserService = (service, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!service) {
        throw new CustomError_1.default("Please select a field of work", 400);
    }
    user.service = service;
    yield user.save();
});
exports.addUserService = addUserService;
const addUserSkills = (skills, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Array.isArray(skills) ||
        skills.some((skill) => typeof skill !== "string")) {
        throw new CustomError_1.default("Skills must be an array of strings.", 400);
    }
    if (skills.length === 0) {
        throw new CustomError_1.default("Please provide skills", 400);
    }
    const currentSkills = user.skills || [];
    const updatedSkills = Array.from(new Set([...currentSkills, ...skills]));
    user.skills = updatedSkills;
    yield user.save();
});
exports.addUserSkills = addUserSkills;
const addUserExperience = (experience, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Array.isArray(experience) ||
        experience.some((exp) => typeof exp !== "object" || exp === null)) {
        throw new CustomError_1.default("Experience must be an array of objects.", 400);
    }
    if (experience.length === 0) {
        throw new CustomError_1.default("Please provide an experience", 400);
    }
    const currentExperience = user.experience || [];
    const updatedExperience = Array.from(new Set([...currentExperience, ...experience]));
    user.experience = updatedExperience;
    yield user.save();
});
exports.addUserExperience = addUserExperience;
const addUserEducation = (education, user) => __awaiter(void 0, void 0, void 0, function* () {
    const currentEducation = user.education || [];
    const addEducation = [...currentEducation, education];
    user.education = addEducation;
    yield user.save();
});
exports.addUserEducation = addUserEducation;
const addUserLanguages = (languages, user) => __awaiter(void 0, void 0, void 0, function* () {
    const currentLanguage = user.languages || [];
    const addLanguage = [...currentLanguage, ...languages];
    user.languages = addLanguage;
    yield user.save();
});
exports.addUserLanguages = addUserLanguages;
const addUserBio = (bio, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!bio) {
        throw new CustomError_1.default("This field is required.", 400);
    }
    user.bio = bio;
    yield user.save();
});
exports.addUserBio = addUserBio;
const addUserJobTitle = (jobTitle, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!jobTitle) {
        throw new CustomError_1.default("This field is required.", 400);
    }
    user.jobTitle = jobTitle;
    yield user.save();
});
exports.addUserJobTitle = addUserJobTitle;
const addUserHourlyRate = (hourlyRate, user) => __awaiter(void 0, void 0, void 0, function* () {
    user.hourlyRate = hourlyRate;
    yield user.save();
});
exports.addUserHourlyRate = addUserHourlyRate;
const addUserProfilePic = (profilPic, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!profilPic) {
        throw new CustomError_1.default("Please provide a profile picture", 400);
    }
    user.profilPicture = profilPic;
    yield user.save();
});
exports.addUserProfilePic = addUserProfilePic;
const updateUserExperience = (expId, user, updatedExperience) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!user.experience || user.experience.length === 0) {
        throw new CustomError_1.default("No experience found for this user", 400);
    }
    const experienceIndex = (_a = user.experience) === null || _a === void 0 ? void 0 : _a.findIndex((exp) => exp.id === expId);
    if (experienceIndex === -1) {
        throw new CustomError_1.default("Experience not found", 400);
    }
    user.experience[experienceIndex] = Object.assign(Object.assign({}, user.experience[experienceIndex]), updatedExperience);
    yield user.save();
});
exports.updateUserExperience = updateUserExperience;
const updateUserEducation = (edId, user, updatedEducation) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!user.education || user.education.length === 0) {
        throw new CustomError_1.default("No education found for this user", 400);
    }
    const educationIndex = (_a = user.education) === null || _a === void 0 ? void 0 : _a.findIndex((edu) => edu.id === edId);
    if (educationIndex === -1) {
        throw new CustomError_1.default("Education not found", 400);
    }
    user.education[educationIndex] = Object.assign(Object.assign({}, user.education[educationIndex]), updatedEducation);
    yield user.save();
});
exports.updateUserEducation = updateUserEducation;
const updateUserLanguage = (languageId, user, proficiency) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!user.languages || user.languages.length === 0) {
        throw new CustomError_1.default("No language found for this user", 400);
    }
    const languageIndex = (_a = user.languages) === null || _a === void 0 ? void 0 : _a.findIndex((lan) => lan.id === languageId);
    if (languageIndex === -1) {
        throw new CustomError_1.default("Language not found", 400);
    }
    user.languages[languageIndex].proficiency = proficiency;
    yield user.save();
});
exports.updateUserLanguage = updateUserLanguage;
const deleteUserLanguage = (languageId, user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const languageIndex = (_a = user.languages) === null || _a === void 0 ? void 0 : _a.findIndex((lan) => lan.id === languageId);
    if (languageIndex === -1) {
        throw new CustomError_1.default("Language not found", 400);
    }
    try {
        yield user.updateOne({
            $pull: {
                languages: { _id: languageId },
            },
        });
    }
    catch (error) {
        throw new CustomError_1.default("Failed to delete language", 500);
    }
});
exports.deleteUserLanguage = deleteUserLanguage;
const deleteUserSkill = (skill, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user.skills || user.skills.length === 0) {
        throw new CustomError_1.default("No skills found for this user", 400);
    }
    const skillIndex = user.skills.indexOf(skill);
    if (skillIndex === -1) {
        throw new CustomError_1.default("Skill not found", 404);
    }
    user.skills.splice(skillIndex, 1);
    yield user.save();
});
exports.deleteUserSkill = deleteUserSkill;
const deleteUserEducation = (educationId, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user.education || user.education.length === 0) {
        throw new CustomError_1.default("No education entries found for this user", 400);
    }
    const educationIndex = user.education.findIndex((edu) => { var _a; return ((_a = edu.id) === null || _a === void 0 ? void 0 : _a.toString()) === educationId; });
    if (educationIndex === -1) {
        throw new CustomError_1.default("Education entry not found", 404);
    }
    user.education.splice(educationIndex, 1);
    yield user.save();
});
exports.deleteUserEducation = deleteUserEducation;
const deleteUserExperience = (experienceId, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user.experience || user.experience.length === 0) {
        throw new CustomError_1.default("No experience entries found for this user", 400);
    }
    const experienceIndex = user.experience.findIndex((exp) => { var _a; return ((_a = exp.id) === null || _a === void 0 ? void 0 : _a.toString()) === experienceId; });
    if (experienceIndex === -1) {
        throw new CustomError_1.default("Experience entry not found", 404);
    }
    user.experience.splice(experienceIndex, 1);
    yield user.save();
});
exports.deleteUserExperience = deleteUserExperience;
