import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Freelancer } from "./freelancer";

@Entity()
export class Language {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  code!: string;

  @Column()
  name!: string;

  @ManyToMany(() => Freelancer, (freelancer) => freelancer.languages)
  freelancers!: Freelancer[];
}
