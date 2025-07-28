import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user";

@Entity()
export class Freelancer {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: true })
  bio?: string;

  @Column({ nullable: true })
  service!: string;

  @Column({ nullable: true })
  jobTitle!: string;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn()
  user!: User;
}
