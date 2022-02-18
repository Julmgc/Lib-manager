import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Entity,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import User from "./userEntity";

@Entity("emailCode")
export default class EmailCode {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("varchar")
  code!: string;

  @CreateDateColumn({ default: new Date() })
  generatedDate!: Date;

  @OneToOne(() => User)
  @JoinColumn()
  user!: User;
}
