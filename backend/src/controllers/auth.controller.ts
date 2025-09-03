import { NextFunction, Request, Response } from "express";
import {
  loginService,
  refreshService,
  resetUserPassword,
  sendEmailToken,
  signUpService,
  verifyTokenService,
} from "../services/auth.service";
import { createToken } from "../utils/createToken";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { CreateUserDto } from "../dtos/create-user.dto";
import { validate } from "class-validator";
import { formatValidationErrors } from "../utils/formatValidationErrors";
import CustomError from "../utils/CustomError";

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

    const login = await loginService(email, password);

    const user = login.user;

    const refreshToken = createToken(
      { id: user.id, userType: user.userType },
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
    return;
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
    const dto = Object.assign(new CreateUserDto(), req.body);

    if (dto.userType !== "Freelancer" && dto.userType !== "Client") {
      throw new CustomError("Please provide a valid user type", 400);
    }

    const errors = await validate(dto);

    if (errors.length > 0) {
      res.status(400).json({
        status: "error",
        message: "Validation failed",
        errors: formatValidationErrors(errors),
      });
      return;
    }

    const { savedUser, token } = await signUpService(dto);

    const refreshToken = createToken(
      { id: savedUser.id, userType: dto.userType },
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

    const { id, firstName, lastName, email } = savedUser;

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      user: { id, firstName, lastName, email },
      token,
    });
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

      const { user, userType } = await refreshService(decoded.id);

      if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const token = createToken(
        {
          id: user.id,
          userType: userType,
          email: user.email,
          verified: user.verified,
        },
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

// Sending a verification token email
const emailToken = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  const { type } = req.body;

  if (!email) {
    res.status(400).json({ msg: "Email is required" });
    return;
  }

  try {
    const responseMessage = await sendEmailToken(email, type);
    res.status(201).json({ msg: responseMessage });
  } catch (error: any) {
    next(error);
  }
};

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const { type, token } = req.params;

  try {
    const responseMessage = await verifyTokenService(type, token);

    res.status(200).json({ msg: responseMessage });
  } catch (error: any) {
    next(error);
  }
};

const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { newPassword } = req.body;
  const { token } = req.body;

  try {
    const message = await resetUserPassword(token, newPassword);

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
  emailToken,
  resetPassword,
  verifyToken,
};
