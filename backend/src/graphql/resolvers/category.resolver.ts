import { Query, Resolver } from "type-graphql";
import { CategoryType } from "../types/category.type";
import { getAllCategories } from "../../services/category.service";

@Resolver()
export class CategoryResolver {
  @Query(() => [CategoryType])
  async categories() {
    return await getAllCategories();
  }
}
