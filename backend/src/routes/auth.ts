import { Router } from "express";
import {
  loginUser,
  refresh,
  logout,
  signUp,
  emailToken,
  verifyToken,
  resetPassword,
} from "../controllers/auth.controller";

const router = Router();

router.post("/login", loginUser);

router.post("/signup", signUp);

router.get("/refresh", refresh);

router.get("/logout", logout);

router.post("/email-link", emailToken);

router.get("/verify-token/:type/:token", verifyToken);

router.post("/reset-password", resetPassword);

export default router;
