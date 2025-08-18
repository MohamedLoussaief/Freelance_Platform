import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Skill } from "./skill.entity";
import { Language } from "./language.entity";
import { Education } from "./education.entity";
import { Experience } from "./experience.entity";

@Entity()
export class Freelancer {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: true })
  bio?: string;

  @Column({ nullable: true })
  service?: string;

  @Column({ nullable: true })
  jobTitle?: string;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn()
  user!: User;

  @ManyToMany(() => Skill, (skill) => skill.freelancers, {
    cascade: true,
  })
  @JoinTable()
  skills!: Skill[];

  @ManyToMany(() => Language, (language) => language.freelancers)
  @JoinTable()
  languages!: Language[];

  @OneToMany(() => Education, (education) => education.freelancer, {
    cascade: true,
  })
  educationList!: Education[];

  @OneToMany(() => Experience, (experience) => experience.freelancer, {
    cascade: true,
  })
  experienceList!: Experience[];
}
