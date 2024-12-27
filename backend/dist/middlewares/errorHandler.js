"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const CustomError_1 = __importDefault(require("../utils/CustomError"));
const mongoose_1 = __importDefault(require("mongoose"));
const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomError_1.default) {
        res.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });
        return;
    }
    // Handle Mongoose Validation Errors
    if (err instanceof mongoose_1.default.Error.ValidationError) {
        const errors = {};
        for (const [path, error] of Object.entries(err.errors)) {
            errors[path] = error.message;
        }
        res.status(400).json({
            status: "error",
            message: "Validation failed",
            errors: errors,
        });
        return;
    }
    res.status(500).json({
        status: "error",
        message: "Internal Server Error",
    });
};
exports.errorHandler = errorHandler;
