import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import Book from "./bookEntity";
import User from "./userEntity";

@Entity("user_books")
export default class UserBooks {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @ManyToOne(() => User, (user) => user.loanedBooks)
  user!: User;

  @ManyToOne(() => Book)
  @JoinColumn()
  book!: Book;

  @Column("date", { default: new Date() })
  checkout_date!: Date;

  @Column("date", { default: new Date() })
  return_date!: Date;

  @Column("date", { nullable: true })
  renew_date!: Date;

  @Column({ default: false })
  returned!: boolean;
}
