import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  id: string;
  userType: string;
  email?: string;
  verified?: boolean;
}

export const createToken = (
  { id, userType, email, verified }: DecodedToken,
  expireDate: string,
  secret: string
) => {
  return jwt.sign({ id, userType, email, verified }, secret, {
    expiresIn: expireDate,
  });
};
