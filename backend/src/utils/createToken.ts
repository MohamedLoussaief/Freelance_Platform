import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  id: string;
  userType: string;
}

export const createToken = (
  { id, userType }: DecodedToken,
  expireDate: string,
  secret: string
) => {
  return jwt.sign({ id, userType }, secret, { expiresIn: expireDate });
};
