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
import { User } from "./user";
import { Skill } from "./skill";
import { Language } from "./language";
import { Education } from "./education";
import { Experience } from "./experience";

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

  @ManyToMany(() => Skill, (skill) => skill.freelancers)
  @JoinTable()
  skills!: Skill[];

  @ManyToMany(() => Language, (language) => language.freelancers)
  @JoinTable()
  languages!: Language[];

  @OneToMany(() => Education, (education) => education.freelancer)
  educationList!: Education[];

  @OneToMany(() => Experience, (experience) => experience.freelancer)
  experienceList!: Experience[];
}
