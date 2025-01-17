import User from "../models/user";
import bcrypt from "bcrypt";
import { Types } from "mongoose";
import { createToken } from "../utils/createToken";
import { emailContent } from "../utils/emailContent";
import transporter from "../utils/emailSender";
import CustomError from "../utils/CustomError";

interface SignUpData {
  userType: string;
  firstName: string;
  lastName: string;
  country: string;
  companyName?: string;
  email: string;
  password: string;
}

export const loginService = async (email: string, password: string) => {
  const userExist = await User.findOne({ email });

  if (!userExist) {
    throw new CustomError("Incorrect email", 400);
  }

  const match = await bcrypt.compare(password, userExist.password);

  if (!match) {
    throw new CustomError("Incorrect password", 400);
  }

  const token = createToken(
    { _id: userExist._id as Types.ObjectId, userType: userExist.userType },
    "1h",
    process.env.ACCESS_TOKEN_SECRET as string
  );

  return { token, userExist };
};

export const refreshService = async (id: string) => {
  const foundUser = await User.findOne({ _id: id }).exec();
  return foundUser;
};

export const signUpService = async (data: SignUpData) => {
  const {
    userType,
    firstName,
    lastName,
    country,
    companyName,
    email,
    password,
  } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new CustomError("This email is already in use", 409);
  }

  const newUser = await User.create({
    userType,
    firstName,
    lastName,
    companyName: userType === "Client" ? companyName : null,
    email,
    country,
    password: password,
  });

  const token = createToken(
    { _id: newUser._id as Types.ObjectId, userType: newUser.userType },
    "15m",
    process.env.ACCESS_TOKEN_SECRET as string
  );

  return {
    user: {
      id: newUser._id,
      userType: newUser.userType,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      country: newUser.country,
    },
    token,
  };
};

export const sendEmailCode = async (email: string, path: string) => {
  // Generate a six-digit code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const codeExpires = Date.now() + 3600000; // One hour from now

  const user = await User.findOneAndUpdate(
    { email },
    { code, codeExpires },
    { new: true }
  );

  if (!user) {
    const error = new Error("User with provided email not found") as Error & {
      status: number;
    };
    error.status = 404;
    throw error;
  }

  // Configure email options
  const subject =
    path === "/email-activation"
      ? "Account Activation Code"
      : "Forgot Password";
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    html: emailContent(code, path, user.firstName),
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
    path === "/emailActivation" ? "the activation" : "the forgot password"
  } code.`;
};

export const verifyUserCode = async (
  email: string,
  code: number,
  action: "activateAccount" | "forgotPassword"
) => {
  if (!email) {
    throw new CustomError("Please provide the email address", 400);
  }

  if (!code) {
    throw new CustomError("Please provide the code", 400);
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError("User email not found", 400);
  }

  if (user.code !== code) {
    throw new CustomError(
      `Invalid ${
        action === "activateAccount" ? "activation" : "forgot password"
      } code`,
      400
    );
  }

  if (user.codeExpires && user.codeExpires < Date.now()) {
    throw new CustomError(
      `Expired ${
        action === "activateAccount" ? "activation" : "forgot password"
      } code`,
      400
    );
  }

  if (action === "activateAccount") {
    user.isActive = true;
  }

  user.code = undefined;
  user.codeExpires = undefined;

  await user.save();

  return action === "activateAccount"
    ? "Account activated successfully"
    : "You can now reset your password";
};

export const resetUserPassword = async (email: string, newPassword: string) => {
  if (!email) {
    throw new CustomError("Email is required", 400);
  }

  if (!newPassword) {
    throw new CustomError("Please provide a new password", 400);
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError("User with the specified email was not found", 404);
  }

  user.password = newPassword;

  await user.save();

  return { msg: "The password has been changed successfully" };
};
