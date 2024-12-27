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
exports.resetUserPassword = exports.verifyUserCode = exports.sendEmailCode = exports.signUpService = exports.refreshService = exports.loginService = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createToken_1 = require("../utils/createToken");
const emailContent_1 = require("../utils/emailContent");
const emailSender_1 = __importDefault(require("../utils/emailSender"));
const CustomError_1 = __importDefault(require("../utils/CustomError"));
const loginService = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const userExist = yield user_1.default.findOne({ email });
    if (!userExist) {
        throw new CustomError_1.default("Incorrect email", 400);
    }
    const match = yield bcrypt_1.default.compare(password, userExist.password);
    if (!match) {
        throw new CustomError_1.default("Incorrect password", 400);
    }
    const token = (0, createToken_1.createToken)({ _id: userExist._id, userType: userExist.userType }, "15m", process.env.ACCESS_TOKEN_SECRET);
    return { token, userExist };
});
exports.loginService = loginService;
const refreshService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield user_1.default.findOne({ _id: id }).exec();
    return foundUser;
});
exports.refreshService = refreshService;
const signUpService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { userType, firstName, lastName, country, companyName, email, password, } = data;
    const existingUser = yield user_1.default.findOne({ email });
    if (existingUser) {
        throw new CustomError_1.default("This email is already in use", 409);
    }
    const newUser = yield user_1.default.create({
        userType,
        firstName,
        lastName,
        companyName: userType === "Client" ? companyName : null,
        email,
        country,
        password: password,
    });
    const token = (0, createToken_1.createToken)({ _id: newUser._id, userType: newUser.userType }, "15m", process.env.ACCESS_TOKEN_SECRET);
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
});
exports.signUpService = signUpService;
const sendEmailCode = (email, path) => __awaiter(void 0, void 0, void 0, function* () {
    // Generate a six-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const codeExpires = Date.now() + 3600000; // One hour from now
    const user = yield user_1.default.findOneAndUpdate({ email }, { code, codeExpires }, { new: true });
    if (!user) {
        const error = new Error("User with provided email not found");
        error.status = 404;
        throw error;
    }
    // Configure email options
    const subject = path === "/emailActivation" ? "Account Activation Code" : "Forgot Password";
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject,
        html: (0, emailContent_1.emailContent)(code, path, user.firstName),
    };
    // Send the email
    yield new Promise((resolve, reject) => {
        emailSender_1.default.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                return reject(new Error("Error sending email. Please try again later."));
            }
            console.log("Email sent: " + info.response);
            resolve(info);
        });
    });
    return `Check your email for ${path === "/emailActivation" ? "the activation" : "the forgot password"} code.`;
});
exports.sendEmailCode = sendEmailCode;
const verifyUserCode = (email, code, action) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email) {
        throw new CustomError_1.default("Please provide the email address", 400);
    }
    if (!code) {
        throw new CustomError_1.default("Please provide the code", 400);
    }
    const user = yield user_1.default.findOne({ email });
    if (!user) {
        throw new CustomError_1.default("User email not found", 400);
    }
    if (user.code !== code) {
        throw new CustomError_1.default(`Invalid ${action === "activateAccount" ? "activation" : "forgot password"} code`, 400);
    }
    if (user.codeExpires && user.codeExpires < Date.now()) {
        throw new CustomError_1.default(`Expired ${action === "activateAccount" ? "activation" : "forgot password"} code`, 400);
    }
    if (action === "activateAccount") {
        user.isActive = true;
    }
    user.code = undefined;
    user.codeExpires = undefined;
    yield user.save();
    return action === "activateAccount"
        ? "Account activated successfully"
        : "You can now reset your password";
});
exports.verifyUserCode = verifyUserCode;
const resetUserPassword = (email, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email) {
        throw new CustomError_1.default("Email is required", 400);
    }
    if (!newPassword) {
        throw new CustomError_1.default("Please provide a new password", 400);
    }
    const user = yield user_1.default.findOne({ email });
    if (!user) {
        throw new CustomError_1.default("User with the specified email was not found", 404);
    }
    user.password = newPassword;
    yield user.save();
    return { msg: "The password has been changed successfully" };
});
exports.resetUserPassword = resetUserPassword;
