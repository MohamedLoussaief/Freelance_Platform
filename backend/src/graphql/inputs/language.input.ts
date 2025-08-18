import { IsNotEmpty } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class LanguageInput {
  @Field()
  @IsNotEmpty()
  code!: string;

  @Field()
  @IsNotEmpty()
  name!: string;

  @Field()
  @IsNotEmpty()
  level!: string;
}
