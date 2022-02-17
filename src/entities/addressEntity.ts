import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";

import User from "./userEntity";

@Entity()
export default class Address {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  street: string;

  @Column()
  streetNumber: string;

  @Column()
  district: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zipcode: string;

  @OneToOne(() => User, (user) => user.address)
  user!: User;

  constructor(
    street: string,
    streetNumber: string,
    district: string,
    city: string,
    state: string,
    zipcode: string
  ) {
    this.street = street;
    this.streetNumber = streetNumber;
    this.district = district;
    this.city = city;
    this.state = state;
    this.zipcode = zipcode;
  }
}
