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
exports.resetPassword = exports.verifyCode = exports.emailCode = exports.signUp = exports.logout = exports.refresh = exports.loginUser = void 0;
const auth_1 = require("../services/auth");
const createToken_1 = require("../utils/createToken");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            res.status(400).json({ message: "All fields must be filled" });
            return;
        }
        // service that returns {token, user}
        const login = yield (0, auth_1.loginService)(email, password);
        const user = login.userExist;
        const refreshToken = (0, createToken_1.createToken)({ _id: user._id, userType: user.userType }, "7d", process.env.REFRESH_TOKEN_SECRET);
        // Create secure cookie with refresh token
        res.cookie("jwt", refreshToken, {
            httpOnly: true, //accessible only by web server
            secure: true, //https
            sameSite: "none", //cross-site cookie
            maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match refresh Token
        });
        const token = login.token;
        res.status(200).json({ token });
    }
    catch (error) {
        next(error);
    }
});
exports.loginUser = loginUser;
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, token } = yield (0, auth_1.signUpService)(req.body);
        const refreshToken = (0, createToken_1.createToken)({ _id: user.id, userType: user.userType }, "7d", process.env.REFRESH_TOKEN_SECRET);
        // Create secure cookie with refresh token
        res.cookie("jwt", refreshToken, {
            httpOnly: true, //accessible only by web server
            secure: true, //https
            sameSite: "none", //cross-site cookie
            maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match refresh Token
        });
        res
            .status(201)
            .json({ message: "User registered successfully", user, token });
    }
    catch (error) {
        next(error);
    }
});
exports.signUp = signUp;
// refreshing the token
const refresh = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt)) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const refreshToken = cookies.jwt;
    jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            res.status(403).json({ message: "Forbidden" });
            return;
        }
        const foundUser = yield (0, auth_1.refreshService)(decoded._id);
        if (!foundUser) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const token = (0, createToken_1.createToken)({ _id: foundUser._id, userType: foundUser.userType }, "15m", process.env.ACCESS_TOKEN_SECRET);
        res.json({ token });
    }));
});
exports.refresh = refresh;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt)) {
        res.sendStatus(204);
        return;
    }
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    res.json({ message: "Cookie cleared" });
});
exports.logout = logout;
// Sending a verification code email
const emailCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email) {
        res.status(400).json({ msg: "Email is required" });
        return;
    }
    try {
        const responseMessage = yield (0, auth_1.sendEmailCode)(email, req.path);
        res.status(201).json({ msg: responseMessage });
    }
    catch (error) {
        res
            .status(error.status || 500)
            .json({ msg: error.message || "Server error" });
    }
});
exports.emailCode = emailCode;
const verifyCode = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, code } = req.body;
    try {
        const action = req.path === "/activateAccount" ? "activateAccount" : "forgotPassword";
        const message = yield (0, auth_1.verifyUserCode)(email, code, action);
        res.status(200).json({ msg: message });
    }
    catch (error) {
        next(error);
    }
});
exports.verifyCode = verifyCode;
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, newPassword } = req.body;
    try {
        const message = yield (0, auth_1.resetUserPassword)(email, newPassword);
        res.status(200).json({ msg: message });
    }
    catch (error) {
        next(error);
    }
});
exports.resetPassword = resetPassword;
