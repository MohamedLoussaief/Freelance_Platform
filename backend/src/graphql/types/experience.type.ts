import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ExperienceType {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  jobTitle!: string;

  @Field(() => String)
  company!: string;

  @Field(() => Boolean)
  currentlyWorking!: boolean;

  @Field(() => Date)
  startDate!: Date;

  @Field(() => Date, { nullable: true })
  endDate?: Date;

  @Field(() => String, { nullable: true })
  description?: string;
}
