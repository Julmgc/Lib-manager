import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Entity,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import User from "./userEntity";

export const genCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

@Entity("emailCode")
export default class EmailCode {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("varchar", { default: genCode(), length: 6 })
  code!: string;

  @CreateDateColumn({ default: new Date() })
  generatedDate!: Date;

  @OneToOne(() => User)
  @JoinColumn()
  user!: User;
}
