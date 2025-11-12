import { InputType, Field } from "type-graphql";
import { Matches, Length, IsNotEmpty } from "class-validator";

@InputType()
export class JobTitleInput {
  @Field()
  @IsNotEmpty({ message: "JobTitle must not be empty" })
  @Matches(/^[A-Za-z0-9\s\/&\-]+$/, {
    message: "Job title must contain only letters and spaces",
  })
  @Length(2, 100, {
    message: "Job title must be between 2 and 100 characters",
  })
  jobTitle!: string;
}
