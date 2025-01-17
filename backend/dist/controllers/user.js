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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAccountInfo = exports.deleteExperience = exports.deleteEducation = exports.deleteSkill = exports.deleteLanguage = exports.getUserData = exports.updateLanguage = exports.updateEducation = exports.updateExperience = exports.addProfilePic = exports.addHourlyRate = exports.addJobTitle = exports.addBio = exports.addLanguages = exports.addEducation = exports.addExperience = exports.addSkills = exports.addService = void 0;
const user_1 = require("../services/user");
// update lastName, firstName, email, country, sector, companyName
const updateAccountInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { lastName, firstName, email, country, sector, companyName } = req.body;
    try {
        yield (0, user_1.updateUserAccount)(lastName, firstName, email, country, sector, companyName, user);
        res.status(200).json({ msg: "Account information updated successfully" });
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.updateAccountInfo = updateAccountInfo;
const addService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { service } = req.body;
    try {
        yield (0, user_1.addUserService)(service, user);
        res.status(200).json({ msg: "Service added successfully" });
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.addService = addService;
const addSkills = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { skills } = req.body;
    try {
        yield (0, user_1.addUserSkills)(skills, user);
        res.status(200).json({ msg: "Skills added successfully" });
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.addSkills = addSkills;
const addExperience = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { experience } = req.body;
    try {
        yield (0, user_1.addUserExperience)(experience, user);
        res.status(200).json({ msg: "Experience added successfully" });
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.addExperience = addExperience;
const addEducation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { education } = req.body;
    try {
        yield (0, user_1.addUserEducation)(education, user);
        res.status(200).json({ msg: "Education added successfully" });
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.addEducation = addEducation;
const addLanguages = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { languages } = req.body;
    try {
        yield (0, user_1.addUserLanguages)(languages, user);
        res.status(200).json({ msg: "Languages added successfully" });
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.addLanguages = addLanguages;
const addBio = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { bio } = req.body;
    try {
        yield (0, user_1.addUserBio)(bio, user);
        res.status(200).json({ msg: "Bio added successfully" });
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.addBio = addBio;
const addJobTitle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { jobTitle } = req.body;
    try {
        yield (0, user_1.addUserJobTitle)(jobTitle, user);
        res.status(200).json({ msg: "Job Title added successfully" });
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.addJobTitle = addJobTitle;
const addHourlyRate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { hourlyRate } = req.body;
    try {
        yield (0, user_1.addUserHourlyRate)(hourlyRate, user);
        res.status(200).json({ msg: "Hourly Rate added successfully" });
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.addHourlyRate = addHourlyRate;
const addProfilePic = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const profilPic = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    const user = req.user;
    try {
        yield (0, user_1.addUserProfilePic)(profilPic, user);
        res.status(200).json({ msg: "Profile picture added successfully" });
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.addProfilePic = addProfilePic;
const updateExperience = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { id } = req.params;
    const { jobTitle, company, currentlyWorking, startDate, endDate, description, } = req.body;
    try {
        yield (0, user_1.updateUserExperience)(id, user, {
            jobTitle,
            company,
            currentlyWorking,
            startDate,
            endDate,
            description,
        });
        res.status(200).json({ msg: "Experience updated successfully" });
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.updateExperience = updateExperience;
const updateEducation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { id } = req.params;
    const { university, degree, field, startYear, endYear } = req.body;
    try {
        yield (0, user_1.updateUserEducation)(id, user, {
            university,
            degree,
            field,
            startYear,
            endYear,
        });
        res.status(200).json({ msg: "Education updated successfully" });
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.updateEducation = updateEducation;
const updateLanguage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { id } = req.params;
    const { proficiency } = req.body;
    try {
        yield (0, user_1.updateUserLanguage)(id, user, proficiency);
        res.status(200).json({ msg: "Language proficiency updated successfully" });
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.updateLanguage = updateLanguage;
const getUserData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    try {
        res.status(200).json({ user });
    }
    catch (error) {
        next(error);
    }
});
exports.getUserData = getUserData;
const deleteLanguage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    try {
        const { id } = req.params;
        const user = req.user;
        yield (0, user_1.deleteUserLanguage)(id, user);
        res.status(200).json({ msg: "Language deleted successfully" });
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.deleteLanguage = deleteLanguage;
const deleteSkill = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { skill } = req.params;
    try {
        yield (0, user_1.deleteUserSkill)(skill, user);
        res.status(200).json({ msg: "Skill deleted successfully" });
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.deleteSkill = deleteSkill;
const deleteEducation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { id } = req.params;
    try {
        yield (0, user_1.deleteUserEducation)(id, user);
        res.status(200).json({ msg: "Education entry deleted successfully" });
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.deleteEducation = deleteEducation;
const deleteExperience = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { id } = req.params;
    try {
        yield (0, user_1.deleteUserExperience)(id, user);
        res.status(200).json({ msg: "Experience entry deleted successfully" });
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.deleteExperience = deleteExperience;
