import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import portfolioRoutes from "./routes/portfolio";
import projectRoutes from "./routes/project";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: process.env.CLIENT, credentials: true }));

// routes
app.use("/auth", authRoutes);
app.use("/profile", userRoutes);
app.use("/portfolio", portfolioRoutes);
app.use("/project", projectRoutes);

// error handler middleware
app.use(errorHandler);

// Connect to db
mongoose
  .connect(process.env.DB_URL as string)
  .then(() => {
    console.log("Connected to the database succefully");
  })
  .catch((error) => {
    console.log("error with connecting", error);
  });

// Server listening
app.listen(process.env.PORT, () => {
  console.log(`I'm listening in port 9090`);
});
