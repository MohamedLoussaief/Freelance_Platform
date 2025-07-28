import { User } from "../entities/user";
import bcrypt from "bcrypt";
import { createToken } from "../utils/createToken";
import { emailContent } from "../utils/emailContent";
import transporter from "../utils/emailSender";
import CustomError from "../utils/CustomError";
import { CreateUserDto } from "../dtos/create-user.dto";
import { AppDataSource } from "../data-source";
import { Freelancer } from "../entities/freelancer";
import { Client } from "../entities/client";
import crypto from "crypto";

const userRepository = AppDataSource.getRepository(User);
const clientRepository = AppDataSource.getRepository(Client);
const freelancerRepository = AppDataSource.getRepository(Freelancer);

export const loginService = async (email: string, password: string) => {
  const user = await userRepository.findOne({
    where: { email },
    select: ["id", "email", "password"],
  });

  if (!user) {
    throw new CustomError("Invalid credentials", 400);
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new CustomError("Invalid credentials", 400);
  }

  const isClient = await clientRepository.findOne({
    where: { user },
  });

  const userType = isClient ? "Client" : "Freelancer";

  const token = createToken(
    { id: user.id, userType: userType },
    "15m",
    process.env.ACCESS_TOKEN_SECRET as string
  );

  return { token, user: { id: user.id, email: user.email, userType } };
};

export const refreshService = async (id: string) => {
  const user = await userRepository.findOne({ where: { id } });
  if (!user) {
    throw new CustomError("User not found", 404);
  }
  const isClient = await clientRepository.findOne({
    where: { user },
  });
  const userType = isClient ? "Client" : "Freelancer";
  return { user, userType };
};

export const signUpService = async (dto: CreateUserDto) => {
  const existingUser = await userRepository.findOne({
    where: { email: dto.email },
  });
  if (existingUser) {
    throw new CustomError("This email is already in use", 409);
  }

  const user = new User();

  Object.assign(user, dto);

  user.password = await bcrypt.hash(dto.password, 12);

  const savedUser = await userRepository.save(user);

  const token = createToken(
    { id: savedUser.id, userType: dto.userType },
    "15m",
    process.env.ACCESS_TOKEN_SECRET as string
  );

  if (dto.userType === "Client") {
    const client = new Client();
    Object.assign(client, dto);
    client.user = savedUser;
    await clientRepository.save(client);
  } else if (dto.userType === "Freelancer") {
    const freelancer = new Freelancer();
    freelancer.user = savedUser;
    await freelancerRepository.save(freelancer);
  }

  return {
    savedUser,
    token,
  };
};

export const sendEmailToken = async (
  email: string,
  type: "verify" | "reset"
) => {
  // Generate a six-digit code
  const token = crypto.randomBytes(32).toString("hex");
  const expiry = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

  const user = await userRepository.findOne({ where: { email } });

  if (!user) {
    throw new CustomError("User not found", 404);
  }

  if (!type) {
    throw new CustomError("Please provide token type", 404);
  }

  user.token = token;
  user.tokenExpiry = expiry;
  user.tokenType = type;

  await userRepository.save(user);

  // Configure email options
  const subject =
    user.tokenType === "verify" ? "Account Activation" : "Forgot Password";
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    html: emailContent(token, user.tokenType, user.firstName),
  };

  // Send the email
  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return reject(
          new Error("Error sending email. Please try again later.")
        );
      }
      console.log("Email sent: " + info.response);
      resolve(info);
    });
  });

  return `Check your email for ${
    user.tokenType === "verify" ? "the activation" : "the forgot password"
  } link.`;
};

export const verifyTokenService = async (type: string, token: string) => {
  const user = await userRepository.findOne({
    where: { token, tokenType: type },
  });

  if (!user || !user.tokenExpiry || user.tokenExpiry < new Date()) {
    throw new CustomError("Invalid or expired token", 400);
  }

  if (type === "verify") {
    user.verified = true;
    user.token = null;
    user.tokenType = null;
    user.tokenExpiry = null;
    await userRepository.save(user);
  }

  const msg =
    type === "verify"
      ? "Account verified!"
      : "Token is valid for password reset";

  return msg;
};

export const resetUserPassword = async (token: string, newPassword: string) => {
  const user = await userRepository.findOne({
    where: { token, tokenType: "reset" },
  });

  if (!user || !user.tokenExpiry || user.tokenExpiry < new Date()) {
    throw new CustomError("Invalid or expired token", 400);
  }

  user.password = await bcrypt.hash(newPassword, 12);

  user.token = null;
  user.tokenType = null;
  user.tokenExpiry = null;

  await userRepository.save(user);

  return "Password reset successfully";
};
