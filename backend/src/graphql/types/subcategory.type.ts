import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class SubcategoryType {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  name!: string;
}
