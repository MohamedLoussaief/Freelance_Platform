import mongoose, { Schema, Document, model, Types } from "mongoose";

enum Status {
  OPEN = "OPEN",
  IN_PROGRESS = "IN PROGRESS",
  COMPLETED = "COMPLETED",
}

export interface IProject extends Document {
  title: string;
  description: string;
  skillsRequired: string[];
  budget: number;
  deadline: Date;
  status: Status;
  user: Types.ObjectId;
}

const projectSchema = new Schema<IProject>(
  {
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
        validator: (value: string[]) => value.length > 0,
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
        validator: (value: Date) => value > new Date(),
        message: "Deadline must be a future date",
      },
    },
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.OPEN,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt` fields
  }
);

export default model<IProject>("Project", projectSchema);
