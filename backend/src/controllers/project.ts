import { Response, NextFunction } from "express";
import {
  createProjectService,
  deleteProjectService,
  getAllProjectsService,
  getUserProjectsService,
  updateProjectService,
} from "../services/project";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";

const createProject = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const projectData = req.body;
    const user = req.user;

    const newProject = await createProjectService({
      ...projectData,
      user: user._id,
    });
    res.status(201).json({
      status: "success",
      data: newProject,
    });
    return;
  } catch (error) {
    next(error);
  }
};

const getUserProjects = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const projects = await getUserProjectsService(user._id);
    res.status(200).json({
      status: "success",
      data: projects,
    });
    return;
  } catch (error) {
    next(error);
  }
};

const getAllProjects = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const projects = await getAllProjectsService();
    res.status(200).json({
      status: "success",
      data: projects,
    });
    return;
  } catch (error) {
    next(error);
  }
};

const updateProject = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedProject = await updateProjectService(id, updatedData);
    res.status(200).json({
      status: "success",
      data: updatedProject,
    });
    return;
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    await deleteProjectService(id);
    res.status(204).json({
      status: "success",
      message: "Project deleted successfully",
    });
    return;
  } catch (error) {
    next(error);
  }
};

export {
  createProject,
  getUserProjects,
  getAllProjects,
  updateProject,
  deleteProject,
};
