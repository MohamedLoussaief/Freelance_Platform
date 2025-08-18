import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class EducationType {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  university!: string;

  @Field(() => String)
  degree!: string;

  @Field(() => String)
  major!: string;

  @Field(() => Number)
  startYear!: number;

  @Field(() => Number)
  endYear!: number;
}
