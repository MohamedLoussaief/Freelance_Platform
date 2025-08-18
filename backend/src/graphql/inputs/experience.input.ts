import { IsDate, IsInt, IsNotEmpty, Matches } from "class-validator";
import { Field, ID, InputType } from "type-graphql";

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

@InputType()
export class ExperienceInput {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field()
  @IsNotEmpty({ message: "Job title is required" })
  jobTitle!: string;

  @Field()
  @IsNotEmpty({ message: "Company name is required" })
  company!: string;

  @Field()
  currentlyWorking!: string;

  @Field()
  @Matches(DATE_REGEX, { message: "Start date must be in YYYY-MM-DD format" })
  startDate!: string;

  @Field({ nullable: true })
  @Matches(DATE_REGEX, { message: "End date must be in YYYY-MM-DD format" })
  endDate?: string;

  @Field()
  @IsNotEmpty({ message: "Description is required" })
  description!: string;
}
