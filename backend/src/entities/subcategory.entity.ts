import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./category.entity";
import { Freelancer } from "./freelancer.entity";

@Entity()
export class Subcategory {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @ManyToOne(() => Category, (category) => category.subcategories, {
    onDelete: "CASCADE",
  })
  category!: Category;

  @ManyToMany(() => Freelancer, (freelancer) => freelancer.subcategories)
  freelancers!: Freelancer[];
}
