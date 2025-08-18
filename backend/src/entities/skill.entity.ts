import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Freelancer } from "./freelancer.entity";

@Entity()
export class Skill {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @ManyToMany(() => Freelancer, (freelancer) => freelancer.skills)
  freelancers!: Freelancer[];
}
