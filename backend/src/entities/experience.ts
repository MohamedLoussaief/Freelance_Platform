import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Freelancer } from "./freelancer";

@Entity()
export class Experience {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  jobTitle!: string;

  @Column()
  company!: string;

  @Column()
  currentlyWorking!: string;

  @Column()
  startDate!: Date;

  @Column()
  endDate!: Date;

  @Column()
  Description!: string;

  @ManyToOne(() => Freelancer, (freelancer) => freelancer.experienceList)
  freelancer!: Freelancer;
}
