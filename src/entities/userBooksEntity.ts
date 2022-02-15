import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";

@Entity("user_books")
export default class UserBooks {
	@PrimaryGeneratedColumn("increment")
	id!: number;

	@ManyToOne("")
	user_id!: number;

	@ManyToOne("")
	book_id!: number;

	@Column("date", { default: new Date() })
	checkout_date!: Date;

	@Column("date", { default: new Date() })
	return_date!: Date;

	@Column("date", { nullable: true })
	renew_date!: Date;
}
