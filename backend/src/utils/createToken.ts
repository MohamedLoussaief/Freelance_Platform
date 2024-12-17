import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { Types } from "mongoose";
import { UserType } from "../models/user";

interface DecodedToken extends JwtPayload {
  _id: Types.ObjectId;
  userType: UserType;
}

export const createToken = (
  { _id, userType }: DecodedToken,
  expireDate: string,
  secret: string
) => {
  return jwt.sign({ _id, userType }, secret, { expiresIn: expireDate });
};
