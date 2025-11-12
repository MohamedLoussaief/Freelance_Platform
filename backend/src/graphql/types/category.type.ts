import { Field, ObjectType } from "type-graphql";
import { SubcategoryType } from "./subcategory.type";

@ObjectType()
export class CategoryType {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => [SubcategoryType])
  subcategories!: SubcategoryType[];
}
