import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ExperienceType {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  jobTitle!: string;

  @Field(() => String)
  company!: string;

  @Field(() => String)
  currentlyWorking!: string;

  @Field(() => Date)
  startDate!: Date;

  @Field(() => Date, { nullable: true })
  endDate?: Date;

  @Field(() => String)
  description!: string;
}
