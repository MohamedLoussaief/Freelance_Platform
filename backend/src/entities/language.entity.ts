import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Freelancer } from "./freelancer.entity";

@Entity()
export class Language {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  code!: string;

  @Column()
  name!: string;

  @Column()
  level!: string;

  @ManyToMany(() => Freelancer, (freelancer) => freelancer.languages)
  freelancers!: Freelancer[];
}
