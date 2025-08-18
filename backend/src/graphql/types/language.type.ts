import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class LanguageType {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  code!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  level!: string;
}
