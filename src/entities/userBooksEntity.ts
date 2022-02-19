import {
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne,
	Column,
	JoinColumn,
	CreateDateColumn,
} from "typeorm";
import Book from "./bookEntity";
import User from "./userEntity";

@Entity("user_books")
export default class UserBooks {
	@PrimaryGeneratedColumn("increment")
	id!: number;

	@ManyToOne(() => User, (user) => user.loanedBooks)
	user!: User;

	@ManyToOne(() => Book, { eager: true })
	@JoinColumn()
	book!: Book;

	@CreateDateColumn()
	checkout_date!: Date;

	@Column("date", {
		default: new Date(new Date().setDate(new Date().getDate() + 7)),
	})
	return_date!: Date;

	@Column({ default: false })
	renewed!: boolean;

	@Column({ default: false })
	returned!: boolean;

	bookId?: string;

	toJSON() {
		const { book, ...data } = this;
		data["bookId"] = this.book.id;
		return data;
	}
}
