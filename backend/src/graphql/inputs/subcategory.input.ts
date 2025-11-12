import { IsNotEmpty } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class SubcategoryInput {
  @Field()
  @IsNotEmpty()
  id!: string;
}
