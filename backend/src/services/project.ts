import { IProject } from "../models/project";
import Project from "../models/project";
import CustomError from "../utils/CustomError";

const createProjectService = async (projectData: Partial<IProject>) => {
  const project = new Project(projectData);
  await project.save();
  return project;
};

const getUserProjectsService = async (userId: string) => {
  const projects = await Project.find({ user: userId });
  return projects;
};

const getAllProjectsService = async () => {
  const projects = await Project.find();
  return projects;
};

const updateProjectService = async (
  projectId: string,
  updatedData: Partial<IProject>
) => {
  const project = await Project.findByIdAndUpdate(projectId, updatedData, {
    new: true, // return the updated project
    runValidators: true, // validate the updated data
  });
  if (!project) {
    throw new CustomError("Project not found", 400);
  }
  return project;
};

const deleteProjectService = async (projectId: string) => {
  const project = await Project.findByIdAndDelete(projectId);
  if (!project) {
    throw new CustomError("Project not found", 400);
  }
  return project;
};

export {
  createProjectService,
  getUserProjectsService,
  updateProjectService,
  deleteProjectService,
  getAllProjectsService,
};
