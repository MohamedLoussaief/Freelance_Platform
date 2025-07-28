import { Request, Response, NextFunction } from "express";
import CustomError from "../utils/CustomError";

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

  res.status(500).json({
    status: "error",
    error: err,
    message: "Internal Server Error",
  });
};
