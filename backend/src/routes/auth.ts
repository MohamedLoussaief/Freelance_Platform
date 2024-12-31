import { Router } from "express";
import {
  loginUser,
  refresh,
  logout,
  signUp,
  emailCode,
  verifyCode,
  resetPassword,
} from "../controllers/auth";

const router = Router();

router.post("/login", loginUser);

router.post("/signup", signUp);

router.get("/refresh", refresh);

router.get("/logout", logout);

router.post("/email-activation", emailCode);

router.post("/email-forget-password", emailCode);

router.post("/activate-account", verifyCode);

router.post("/forget-password", verifyCode);

router.post("/reset-password", resetPassword);

export default router;
