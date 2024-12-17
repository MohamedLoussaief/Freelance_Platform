import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import cookieParserModule from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParserModule());

// routes
app.use("/auth", authRoutes);

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
function cookieParser(): any {
  throw new Error("Function not implemented.");
}
