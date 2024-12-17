import { Router } from "express";
import { loginUser, refresh, logout, signUp } from "../controllers/auth";

const router = Router();

router.post("/login", loginUser);

router.post("/signup", signUp);

router.get("/refresh", refresh);

router.get("/logout", logout);

export default router;
