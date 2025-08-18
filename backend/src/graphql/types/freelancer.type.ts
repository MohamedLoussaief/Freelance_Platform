import { Field, ObjectType } from "type-graphql";
import { EducationType } from "./education.type";
import { ExperienceType } from "./experience.type";
import { LanguageType } from "./language.type";
import { SkillType } from "./skill.type";

@ObjectType()
export class FreelancerType {
  @Field(() => String)
  id!: string;

  @Field(() => String, { nullable: true })
  bio?: string;

  @Field(() => String, { nullable: true })
  service?: string;

  @Field(() => String, { nullable: true })
  jobTitle?: string;

  @Field(() => [EducationType], { nullable: true })
  educationList?: EducationType[];

  @Field(() => [ExperienceType], { nullable: true })
  experienceList?: ExperienceType[];

  @Field(() => [LanguageType], { nullable: true })
  languages?: LanguageType[];

  @Field(() => [SkillType], { nullable: true })
  skills?: SkillType[];
}
