import { Subcategory } from "./categoriesInterfaces";
import { Experience } from "./experienceInterface";
import { Skill } from "./skillInterface";

export interface Freelancer {
  id: string;
  bio: string;
  jobTitle: string;
  subcategories: Subcategory[];
  skills: Skill[];
  experienceList: Experience[];
}

export interface GetFreelancerResponse {
  freelancer: Freelancer;
}
