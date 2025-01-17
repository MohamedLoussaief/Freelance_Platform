"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proficiency = exports.Service = exports.UserType = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const CustomError_1 = __importDefault(require("../utils/CustomError"));
// UserType enum
var UserType;
(function (UserType) {
    UserType["Client"] = "Client";
    UserType["Freelance"] = "Freelancer";
})(UserType || (exports.UserType = UserType = {}));
var Service;
(function (Service) {
    Service["WebMobileSoftwareDev"] = "Web, Mobile & Software Development";
    Service["ITNetworking"] = "IT & Networking";
    Service["DataScienceAnalytics"] = "Data Science & Analytics";
    Service["DesignCreative"] = "Design & Creative";
    Service["SalesMarketing"] = "Sales & Marketing";
    Service["Translation"] = "Translation";
    Service["Writing"] = "Writing";
})(Service || (exports.Service = Service = {}));
var Proficiency;
(function (Proficiency) {
    Proficiency["Beginner"] = "Beginner";
    Proficiency["Intermediate"] = "Intermediate";
    Proficiency["Advanced"] = "Advanced";
    Proficiency["Fluent"] = "Fluent";
})(Proficiency || (exports.Proficiency = Proficiency = {}));
// User Schema
const userSchema = new mongoose_1.Schema({
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
        unique: [true, "This email is already in use"],
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
                        validator: function (value) {
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
                    validator: function (value) {
                        return value <= new Date().getFullYear();
                    },
                    message: "Start year must be a valid year.",
                },
            },
            endYear: {
                type: Number,
                validate: {
                    validator: function (value) {
                        const currentYear = new Date().getFullYear();
                        const maxFutureYear = currentYear + 7;
                        return value >= this.startYear && value <= maxFutureYear;
                    },
                    message: (props) => `End year (${props.value}) must be after the start year and within 7 years of the current year.`,
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
            validator: function (value) {
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
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (!user.isModified("password")) {
            return next();
        }
        const password = user.password;
        const validations = [
            {
                test: (value) => value.length >= 8,
                message: "Password must be at least 8 characters long.",
            },
            {
                test: (value) => /[A-Z]/.test(value),
                message: "Password must include at least one uppercase letter.",
            },
            {
                test: (value) => /[a-z]/.test(value),
                message: "Password must include at least one lowercase letter.",
            },
            {
                test: (value) => /[0-9]/.test(value),
                message: "Password must include at least one digit.",
            },
            {
                test: (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value),
                message: "Password must include at least one special character.",
            },
        ];
        for (const { test, message } of validations) {
            if (!test(password)) {
                const validationError = new CustomError_1.default(message, 400);
                return next(validationError);
            }
        }
        const saltRounds = 10;
        user.password = yield bcrypt_1.default.hash(password, saltRounds);
        next();
    });
});
exports.default = (0, mongoose_1.model)("User", userSchema);
