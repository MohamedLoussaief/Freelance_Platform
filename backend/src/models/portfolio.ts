import { Schema, Document, model } from "mongoose";
import validator from "validator";

interface IPortfolio extends Document {
  title: string;
  description: string;
  mediaUrl: string;
}

const portfolioSchema = new Schema<IPortfolio>({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    maxlength: 2000,
    required: [true, "Description is required"],
  },

  mediaUrl: {
    type: String,
    trim: true,
    validate: {
      validator: (value) => validator.isURL(value),
      message: "Please enter a valid URL",
    },
  },
});

export default model<IPortfolio>("Portfolio", portfolioSchema);
