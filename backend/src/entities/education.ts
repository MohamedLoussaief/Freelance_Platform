import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Freelancer } from "./freelancer";

@Entity()
export class Education {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  university!: string;

  @Column()
  degree!: string;

  @Column()
  major!: string;

  @Column()
  startYear!: number;

  @Column()
  endYear!: number;

  @ManyToOne(() => Freelancer, (freelancer) => freelancer.educationList)
  freelancer!: Freelancer;
}
