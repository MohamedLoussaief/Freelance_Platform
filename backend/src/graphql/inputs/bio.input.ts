import { InputType, Field } from "type-graphql";
import { Length, IsNotEmpty } from "class-validator";

@InputType()
export class BioInput {
  @Field()
  @IsNotEmpty({ message: "Bio must not be empty" })
  @Length(100, 2000, {
    message: "Bio must be between 100 and 2000 characters",
  })
  bio!: string;
}
