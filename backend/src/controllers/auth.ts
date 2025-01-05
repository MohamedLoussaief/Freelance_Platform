import { NextFunction, Request, Response } from "express";
import {
  loginService,
  refreshService,
  resetUserPassword,
  sendEmailCode,
  signUpService,
  verifyUserCode,
} from "../services/auth";
import { createToken } from "../utils/createToken";
import { Types } from "mongoose";
import jwt, { VerifyErrors } from "jsonwebtoken";

const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400).json({ message: "All fields must be filled" });
      return;
    }

    // service that returns {token, user}
    const login = await loginService(email, password);

    const user = login.userExist;

    const refreshToken = createToken(
      { _id: user._id as Types.ObjectId, userType: user.userType },
      "7d",
      process.env.REFRESH_TOKEN_SECRET as string
    );

    // Create secure cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: "none", //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match refresh Token
    });

    const token = login.token;

    res.status(200).json({ token });
  } catch (error: any) {
    next(error);
  }
};

const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { user, token } = await signUpService(req.body);

    const refreshToken = createToken(
      { _id: user.id as Types.ObjectId, userType: user.userType },
      "7d",
      process.env.REFRESH_TOKEN_SECRET as string
    );

    // Create secure cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: "none", //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match refresh Token
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user, token });
  } catch (error: any) {
    next(error);
  }
};

// refreshing the token
const refresh = async (req: Request, res: Response): Promise<void> => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string,
    async (err: VerifyErrors | null, decoded: any | undefined) => {
      if (err) {
        res.status(403).json({ message: "Forbidden" });
        return;
      }

      const foundUser = await refreshService(decoded._id);

      if (!foundUser) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const token = createToken(
        { _id: foundUser._id as Types.ObjectId, userType: foundUser.userType },
        "15m",
        process.env.ACCESS_TOKEN_SECRET as string
      );

      res.json({ token });
    }
  );
};

const logout = async (req: Request, res: Response): Promise<void> => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    res.sendStatus(204);
    return;
  }
  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
  res.json({ message: "Cookie cleared" });
};

// Sending a verification code email
const emailCode = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ msg: "Email is required" });
    return;
  }

  try {
    const responseMessage = await sendEmailCode(email, req.path);

    res.status(201).json({ msg: responseMessage });
  } catch (error: any) {
    res
      .status(error.status || 500)
      .json({ msg: error.message || "Server error" });
  }
};

const verifyCode = async (req: Request, res: Response, next: NextFunction) => {
  const { email, code } = req.body;

  try {
    const action =
      req.path === "/activateAccount" ? "activateAccount" : "forgotPassword";
    const message = await verifyUserCode(email, code, action);

    res.status(200).json({ msg: message });
  } catch (error: any) {
    next(error);
  }
};

const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, newPassword } = req.body;

  try {
    const message = await resetUserPassword(email, newPassword);

    res.status(200).json({ msg: message });
  } catch (error: any) {
    next(error);
  }
};

export {
  loginUser,
  refresh,
  logout,
  signUp,
  emailCode,
  verifyCode,
  resetPassword,
};
