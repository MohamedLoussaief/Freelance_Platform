import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "./entities/user.entity";
import { Freelancer } from "./entities/freelancer.entity";
import { Client } from "./entities/client.entity";
import { Skill } from "./entities/skill.entity";
import { Education } from "./entities/education.entity";
import { Experience } from "./entities/experience.entity";
import { Language } from "./entities/language.entity";

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
