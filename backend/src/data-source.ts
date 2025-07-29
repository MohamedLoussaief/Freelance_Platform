import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "./entities/user";
import { Freelancer } from "./entities/freelancer";
import { Client } from "./entities/client";
import { Skill } from "./entities/skill";
import { Education } from "./entities/education";
import { Experience } from "./entities/experience";
import { Language } from "./entities/language";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Freelancer, Client, Skill, Education, Experience, Language],
  subscribers: [],
  migrations: [],
});
