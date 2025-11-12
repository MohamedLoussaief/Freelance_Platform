import { AppDataSource } from "../data-source";
import { Category } from "../entities/category.entity";

const categoryRepository = AppDataSource.getRepository(Category);

export const getAllCategories = async () => {
  return categoryRepository.find({
    relations: ["subcategories"],
  });
};
