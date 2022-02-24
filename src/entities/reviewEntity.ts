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

  @Column("int")
  rating!: number;

  @Column()
  reviewContent!: string;

  toJSON(): any {
    const { user, book, ...review } = this;
    if (user) {
      return { user: { id: user.id, name: user.name }, book, review };
    }
    return review;
  }
}
