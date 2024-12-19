import { Request, Response, NextFunction } from "express";
import CustomError from "../utils/CustomError";
import mongoose from "mongoose";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
    return;
  }

  // Handle Mongoose Validation Errors
  if (err instanceof mongoose.Error.ValidationError) {
    const errors: Record<string, string> = {};
    for (const [path, error] of Object.entries(err.errors)) {
      errors[path] = (error as any).message;
    }

    res.status(400).json({
      status: "error",
      message: "Validation failed",
      errors: errors,
    });
    return;
  }

  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
};
