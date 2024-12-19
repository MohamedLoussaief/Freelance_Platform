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

router.post("/emailActivation", emailCode);

router.post("/emailForgetPassword", emailCode);

router.post("/activateAccount", verifyCode);

router.post("/forgetPassword", verifyCode);

router.post("/resetPassword", resetPassword);

export default router;
