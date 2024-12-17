import { Schema, Document, model } from "mongoose";
import bcrypt from "bcrypt";
// UserType enum
export enum UserType {
  Client = "Client",
  Freelance = "Freelancer",
}

// User Schema
interface IUser extends Document {
  userType: UserType;
  firstName: string;
  lastName: string;
  country: string;
  email: string;
  password: string;
  profilPicture?: string;
  bio?: string;
  skills?: string[];
  experience?: string;
  education?: string;
  languages?: string[];
  companyName?: string;
  sector?: string;
  paymentMethod?: string[];
  isActive: boolean;
  code?: number;
  codeExpires?: number;
}

// User Schema
const userSchema = new Schema<IUser>({
  userType: {
    type: String,
    enum: Object.values(UserType),
    required: [true, "UserType is required"],
  },
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z\s\-]+$/.test(value);
      },
      message: "Sorry! No special characters or numbers",
    },
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z\s\-]+$/.test(value);
      },
      message: "Sorry! No special characters or numbers",
    },
  },
  country: { type: String, required: [true, "Please select your country"] },
  email: {
    type: String,
    required: [true, "Email address is required"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Please provide a valid email address.",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  profilPicture: { type: String, default: null },
  bio: { type: String, maxlength: 2000, default: null },
  skills: { type: [String] },
  experience: { type: String },
  education: { type: String },
  languages: { type: [String] },
  companyName: { type: String },
  sector: { type: String },
  paymentMethod: { type: [String] },
  isActive: { type: Boolean, default: false },
  code: { type: Number },
  codeExpires: { type: Number },
});

userSchema.pre("save", async function (next) {
  const user = this as IUser;

  const password = user.password;

  const validations = [
    {
      test: (value: string) => value.length >= 8,
      message: "Password must be at least 8 characters long.",
    },
    {
      test: (value: string) => /[A-Z]/.test(value),
      message: "Password must include at least one uppercase letter.",
    },
    {
      test: (value: string) => /[a-z]/.test(value),
      message: "Password must include at least one lowercase letter.",
    },
    {
      test: (value: string) => /[0-9]/.test(value),
      message: "Password must include at least one digit.",
    },
    {
      test: (value: string) => /[!@#$%^&*(),.?":{}|<>]/.test(value),
      message: "Password must include at least one special character.",
    },
  ];

  for (const { test, message } of validations) {
    if (!test(password)) {
      const validationError = new Error(message);
      return next(validationError);
    }
  }

  const saltRounds = 10;
  user.password = await bcrypt.hash(password, saltRounds);

  next();
});

export default model<IUser>("User", userSchema);
