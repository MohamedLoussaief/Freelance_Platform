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
exports.getAllProjectsService = exports.deleteProjectService = exports.updateProjectService = exports.getUserProjectsService = exports.createProjectService = void 0;
const project_1 = __importDefault(require("../models/project"));
const CustomError_1 = __importDefault(require("../utils/CustomError"));
const createProjectService = (projectData) => __awaiter(void 0, void 0, void 0, function* () {
    const project = new project_1.default(projectData);
    yield project.save();
    return project;
});
exports.createProjectService = createProjectService;
const getUserProjectsService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield project_1.default.find({ user: userId });
    return projects;
});
exports.getUserProjectsService = getUserProjectsService;
const getAllProjectsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield project_1.default.find();
    return projects;
});
exports.getAllProjectsService = getAllProjectsService;
const updateProjectService = (projectId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield project_1.default.findByIdAndUpdate(projectId, updatedData, {
        new: true, // return the updated project
        runValidators: true, // validate the updated data
    });
    if (!project) {
        throw new CustomError_1.default("Project not found", 400);
    }
    return project;
});
exports.updateProjectService = updateProjectService;
const deleteProjectService = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield project_1.default.findByIdAndDelete(projectId);
    if (!project) {
        throw new CustomError_1.default("Project not found", 400);
    }
    return project;
});
exports.deleteProjectService = deleteProjectService;
