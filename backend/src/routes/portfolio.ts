import { Router } from "express";
import {
  createPortfolio,
  deletePortfolio,
  getUserPortfolio,
  updatePortfolio,
} from "../controllers/portfolio";
import { requireAuth } from "../middlewares/authMiddleware";

const router = Router();

router.use(requireAuth);

router.post("/create-portfolio", createPortfolio);

router.put("/update-portfolio/:id", updatePortfolio);

router.delete("/delete-portfolio/:id", deletePortfolio);

router.get("/get-user-portfolio", getUserPortfolio);

export default router;
