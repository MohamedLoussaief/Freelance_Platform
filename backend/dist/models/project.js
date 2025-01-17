"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
var Status;
(function (Status) {
    Status["OPEN"] = "OPEN";
    Status["IN_PROGRESS"] = "IN PROGRESS";
    Status["COMPLETED"] = "COMPLETED";
})(Status || (Status = {}));
const projectSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    skillsRequired: {
        type: [String],
        required: [true, "At least one skill is required"],
        validate: {
            validator: (value) => value.length > 0,
            message: "Skills required cannot be empty",
        },
    },
    budget: {
        type: Number,
        required: [true, "Budget is required"],
        min: [0, "Budget must be a positive number"],
    },
    deadline: {
        type: Date,
        required: [true, "Deadline is required"],
        validate: {
            validator: (value) => value > new Date(),
            message: "Deadline must be a future date",
        },
    },
    status: {
        type: String,
        enum: Object.values(Status),
        default: Status.OPEN,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true, // Adds `createdAt` and `updatedAt` fields
});
exports.default = (0, mongoose_1.model)("Project", projectSchema);
