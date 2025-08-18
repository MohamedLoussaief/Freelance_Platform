import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class SkillType {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  name!: string;
}
