import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  Column,
} from "typeorm";
import User from "./userEntity";
import Book from "./bookEntity";

@Entity("reviews")
export default class Review {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, { eager: true })
  user!: User;

  @ManyToOne(() => Book, { eager: true })
  book!: Book;

  @CreateDateColumn()
  createdOn!: Date;

  @Column("number")
  rating!: number;

  @Column()
  reviewContent!: string;
  // constructor(bookId: string) {
  //   this.bookId = bookId;
  // }
}
