import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { context } from "./graphql/context";
import { buildSchema } from "type-graphql";
import { FreelancerResolver } from "./graphql/resolvers/freelancer.resolver";
import { seedCategories } from "./seeds/category.seed";
import { CategoryResolver } from "./graphql/resolvers/category.resolver";

const startServer = async () => {
  dotenv.config();

  const app = express();

  app.use(express.json());
  app.use(cookieParser());
  app.use(cors({ origin: process.env.CLIENT, credentials: true }));

  // routes
  app.use("/api/auth", authRoutes);

  // error handler middleware
  app.use(errorHandler);

  // Initialize TypeORM connection
  await AppDataSource.initialize();

  await seedCategories();

  // Create Schema
  const schema = await buildSchema({
    resolvers: [FreelancerResolver, CategoryResolver],
    authChecker: ({ context }) => {
      return !!context.user;
    },
    validate: true,
  });

  // Create Apollo Server
  const server = new ApolloServer({
    schema,
    context,
  });

  await server.start();
  server.applyMiddleware({
    app: app as any,
    path: "/graphql",
    cors: {
      origin: process.env.CLIENT,
      credentials: true,
    },
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`);
  });
};

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
