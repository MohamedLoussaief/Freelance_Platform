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
exports.deleteProject = exports.updateProject = exports.getAllProjects = exports.getUserProjects = exports.createProject = void 0;
const project_1 = require("../services/project");
const createProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectData = req.body;
        const user = req.user;
        const newProject = yield (0, project_1.createProjectService)(Object.assign(Object.assign({}, projectData), { user: user._id }));
        res.status(201).json({
            status: "success",
            data: newProject,
        });
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.createProject = createProject;
const getUserProjects = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const projects = yield (0, project_1.getUserProjectsService)(user._id);
        res.status(200).json({
            status: "success",
            data: projects,
        });
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.getUserProjects = getUserProjects;
const getAllProjects = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield (0, project_1.getAllProjectsService)();
        res.status(200).json({
            status: "success",
            data: projects,
        });
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.getAllProjects = getAllProjects;
const updateProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedProject = yield (0, project_1.updateProjectService)(id, updatedData);
        res.status(200).json({
            status: "success",
            data: updatedProject,
        });
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.updateProject = updateProject;
const deleteProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, project_1.deleteProjectService)(id);
        res.status(204).json({
            status: "success",
            message: "Project deleted successfully",
        });
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.deleteProject = deleteProject;
