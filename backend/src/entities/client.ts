import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { User } from "./user";

@Entity()
export class Client {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  companyName!: string;

  @Column({ nullable: true })
  industry?: string;

  @Column({ nullable: true })
  website?: string;

  @Column({ nullable: true })
  description?: string;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn()
  user!: User;
}
