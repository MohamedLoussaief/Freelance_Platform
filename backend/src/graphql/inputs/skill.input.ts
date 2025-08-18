import { IsNotEmpty } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class SkillInput {
  @Field()
  @IsNotEmpty({ message: "Skill is required" })
  name!: string;
}
