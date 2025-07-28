import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true })
  picture?: string;

  @Column()
  country!: string;

  @Column({ select: false })
  password!: string;

  @Column({ type: "varchar", nullable: true })
  token?: string | null;

  @Column({ type: "varchar", nullable: true })
  tokenType?: string | null; // 'verify' or 'reset'

  @Column({ type: "timestamp", nullable: true })
  tokenExpiry?: Date | null;

  @Column({ default: false })
  verified!: boolean;
}
