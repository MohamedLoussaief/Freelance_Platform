import { IsInt, IsNotEmpty, Matches, Max } from "class-validator";
import { InputType, Field, ID } from "type-graphql";

const CURRENT_YEAR = new Date().getFullYear();

@InputType()
export class EducationInput {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field()
  @IsNotEmpty({ message: "University name is required" })
  @Matches(/^[^0-9]*$/, { message: "University name must not contain numbers" })
  university!: string;

  @Field()
  @IsNotEmpty({ message: "Degree is required" })
  @Matches(/^[^0-9]*$/, { message: "Degree must not contain numbers" })
  degree!: string;

  @Field()
  @IsNotEmpty({ message: "Field of study is required" })
  @Matches(/^[^0-9]*$/, { message: "Field of study must not contain numbers" })
  major!: string;

  @Field()
  @IsInt({ message: "Start year must be a valid number" })
  @Max(CURRENT_YEAR, { message: "Start year cannot be in the future" })
  startYear!: number;

  @Field({ nullable: true })
  @IsInt({ message: "End year must be a valid number" })
  endYear?: number;
}
