import { Schema, Document, model } from "mongoose";
import bcrypt from "bcrypt";
import CustomError from "../utils/CustomError";

// UserType enum
export enum UserType {
  Client = "Client",
  Freelance = "Freelancer",
}

export enum Service {
  WebMobileSoftwareDev = "Web, Mobile & Software Development",
  ITNetworking = "IT & Networking",
  DataScienceAnalytics = "Data Science & Analytics",
  DesignCreative = "Design & Creative",
  SalesMarketing = "Sales & Marketing",
  Translation = "Translation",
  Writing = "Writing",
}

export enum Proficiency {
  Beginner = "Beginner",
  Intermediate = "Intermediate",
  Advanced = "Advanced",
  Fluent = "Fluent",
}

export interface Experience {
  id?: string;
  jobTitle: string;
  company: string;
  currentlyWorking: boolean;
  startDate: Date;
  endDate?: Date;
  description?: string;
}

export interface Education {
  id?: string;
  university: string;
  degree: string;
  field: string;
  startYear: number;
  endYear: number;
}

export interface Language {
  id: string;
  language: string;
  proficiency: Proficiency;
}

// User Schema
export interface IUser extends Document {
  userType: UserType;
  firstName: string;
  lastName: string;
  country: string;
  email: string;
  password: string;
  profilPicture?: string;
  service?: Service;
  jobTitle?: string;
  bio?: string;
  skills?: string[];
  experience?: Experience[];
  education?: Education[];
  languages?: Language[];
  hourlyRate?: number;
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
  profilPicture: { type: String },
  service: { type: String },
  jobTitle: { type: String },
  bio: {
    type: String,
    minlength: [100, "Bio must be at least 100 characters long."],
    maxlength: [2000, "Bio cannot exceed 2000 characters."],
    default: null,
  },
  skills: {
    type: [String],
  },
  experience: {
    type: [
      {
        jobTitle: { type: String, required: [true, "Job title is required"] },
        company: { type: String, required: [true, "Company name is required"] },
        currentlyWorking: { type: Boolean, default: false },
        startDate: { type: Date, required: [true, "Start date is required"] },
        endDate: {
          type: Date,
          validate: {
            validator: function (this: { startDate: Date }, value: Date) {
              return !value || value > this.startDate;
            },
            message: "End date must be after the start date.",
          },
        },
        description: { type: String, maxlength: 3998 },
      },
    ],
  },
  education: [
    {
      university: { type: String, required: [true, "University is required"] },
      degree: { type: String, required: [true, "Degree is required"] },
      field: { type: String, required: [true, "Field is required"] },
      startYear: {
        type: Number,
        required: [true, "Start year is required"],
        validate: {
          validator: function (value: number) {
            return value <= new Date().getFullYear();
          },
          message: "Start year must be a valid year.",
        },
      },
      endYear: {
        type: Number,
        validate: {
          validator: function (this: { startYear: number }, value: number) {
            const currentYear = new Date().getFullYear();
            const maxFutureYear = currentYear + 7;
            return value >= this.startYear && value <= maxFutureYear;
          },
          message: (props) =>
            `End year (${props.value}) must be after the start year and within 7 years of the current year.`,
        },
      },
    },
  ],
  languages: [
    {
      language: { type: String, required: [true, "Language is required"] },
      proficiency: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced", "Fluent"],
        required: [true, "Proficiency level is required"],
      },
    },
  ],
  hourlyRate: {
    type: Number,
    min: [0, "Hourly rate must be a positive number."],
    validate: {
      validator: function (value: number) {
        return Number.isInteger(value);
      },
      message: "Hourly rate must be an integer value.",
    },
  },
  companyName: { type: String },
  sector: { type: String },
  paymentMethod: { type: [String] },
  isActive: { type: Boolean, default: false },
  code: { type: Number },
  codeExpires: { type: Number },
});

userSchema.pre("save", async function (next) {
  const user = this as IUser;

  if (!user.isModified("password")) {
    return next();
  }

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
      const validationError = new CustomError(message, 400);
      return next(validationError);
    }
  }

  const saltRounds = 10;
  user.password = await bcrypt.hash(password, saltRounds);

  next();
});

export default model<IUser>("User", userSchema);
