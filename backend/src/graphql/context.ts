import { Request } from "express";
import jwt from "jsonwebtoken";
export const context = ({ req }: { req: Request }) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
      return { user };
    } catch (err) {
      console.warn("Invalid token");
    }
  }
  return {};
};
