import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Subcategory } from "./subcategory.entity";

@Entity()
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @OneToMany(() => Subcategory, (subcategory) => subcategory.category, {
    cascade: true,
  })
  subcategories!: Subcategory[];
}
