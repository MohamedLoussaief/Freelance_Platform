import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user";
import { Request, Response, NextFunction } from "express";

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const requireAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  // verify authorization
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ error: "Authorization token is required" });
    return;
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as JwtPayload;

    req.user = await User.findOne({ _id });
    next();
  } catch (error) {
    //console.log(error)
    res.status(403).json({ error: "Request is not authorized" });
  }
};
