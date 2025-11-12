import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Freelancer } from "./freelancer.entity";

@Entity()
export class Experience {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  jobTitle!: string;

  @Column()
  company!: string;

  @Column({ type: "boolean", default: false })
  currentlyWorking!: boolean;

  @Column({ type: "timestamp" })
  startDate!: Date;

  @Column({ type: "timestamp", nullable: true })
  endDate?: Date | null;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => Freelancer, (freelancer) => freelancer.experienceList)
  freelancer!: Freelancer;
}
