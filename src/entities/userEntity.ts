import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BeforeInsert,
	OneToMany,
	OneToOne,
    JoinColumn,
} from "typeorm";
import bcrypt from "bcrypt";

import Address from "./addressEntity";
import Review from "./reviewEntity";
import UserBooks from "./userBooksEntity";
import Fine from "./fineEntity";

@Entity("users")
export default class User {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column()
	name: string;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@OneToMany(() => UserBooks, (userBooks) => userBooks.user)
	loanedBooks!: UserBooks;

	@Column()
	authorized!: boolean;

	@Column()
	isAdm: boolean;

	@BeforeInsert()
	hashPassword() {
		this.password = bcrypt.hashSync(this.password, 10);
	}

	@OneToOne(() => Address)
    @JoinColumn()
	address!: Address;

	// @OneToMany(() => Book, book => book.user)
	// books!: Book[];

	@OneToMany(() => Review, (review) => review.user)
	reviews!: Review[];

	// @OneToMany(() => UserBooks, userBooks => userBooks.user)
	// userBooks!: UserBooks[];

	@OneToMany(() => Fine, (fine) => fine.user)
	fines!: Fine[];

	constructor(name: string, email: string, password: string, isAdm: boolean) {
		this.name = name;
		this.email = email;
		this.password = password;
		this.isAdm = isAdm;
	};

	toJSON() {
		const { password, ...rest} = this;
		return rest;
	};
}
