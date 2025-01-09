import { Router } from "express";
import { requireAuth } from "../middlewares/authMiddleware";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getUserProjects,
  updateProject,
} from "../controllers/project";

const router = Router();

router.use(requireAuth);

router.post("/create-project", createProject);

router.get("/client-projects", getUserProjects);

router.get("/all-projects", getAllProjects);

router.put("/update-project/:id", updateProject);

router.delete("/delete-project/:id", deleteProject);

export default router;
