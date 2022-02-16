import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";

import User from "./userEntity";

@Entity()
export default class Address {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column()
	street: string;

	@Column({ type: "int" })
	streetNumber: number;

	@Column()
	discrict: string;

	@Column()
	city: string;

	@Column()
	state: string;

	@Column()
	zipcode: string;

	constructor(
		street: string,
		streetNumber: number,
		discrict: string,
		city: string,
		state: string,
		zipcode: string
	) {
		this.street = street;
		this.streetNumber = streetNumber;
		this.discrict = discrict;
		this.city = city;
		this.state = state;
		this.zipcode = zipcode;
	}
}
