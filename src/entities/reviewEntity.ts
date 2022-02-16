import {
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	ManyToOne,
} from "typeorm";
import User from "./userEntity";
import Book from "./bookEntity";

@Entity("reviews")
export default class Review {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@ManyToOne(() => User, { eager: true })
	user!: User;

	// @Column()
	// bookId: string;

	@ManyToOne(() => Book, { eager: true })
	book!: Book;

	@CreateDateColumn()
	createdOn!: Date;

	// constructor(bookId: string) {
	//   this.bookId = bookId;
	// }
}
