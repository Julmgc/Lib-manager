import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToOne,
	ManyToOne,
    PrimaryColumn,
    JoinColumn,
} from "typeorm";
import Book from "./bookEntity";
import User from "./userEntity";

@Entity("fine")
export default class Fine {
	@PrimaryGeneratedColumn("increment")
	id!: number;

	@OneToOne(() => Book, { eager: true })
	@JoinColumn()
	book!: Book;

	@ManyToOne(() => User, {eager: true})
	user!: User;

	@Column()
	worth!: number;

	@Column()
	total!: number;

	userId?: string;
	bookId?: string;

	toJSON() {
		const { user, book, ...data } = this;
		data["userId"] = user.id;
		data["bookId"] = book.id;
		return data;
	}
}
