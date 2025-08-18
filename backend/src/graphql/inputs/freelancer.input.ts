import { Field, InputType } from "type-graphql";
import { EducationInput } from "./education.input";
import { ExperienceInput } from "./experience.input";
import { SkillInput } from "./skill.input";
import { LanguageInput } from "./language.input";

@InputType()
export class FreelancerInput {
  @Field()
  bio!: string;

  @Field()
  service!: string;

  @Field()
  jobTitle!: string;

  @Field(() => [EducationInput], { nullable: true })
  educations?: EducationInput[];

  @Field(() => [ExperienceInput], { nullable: true })
  experiences?: ExperienceInput[];

  @Field(() => [SkillInput], { nullable: true })
  skills?: SkillInput[];

  @Field(() => [LanguageInput], { nullable: true })
  languages?: LanguageInput[];
}
