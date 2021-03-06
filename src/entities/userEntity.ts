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

  @Column({ unique: true })
  cpf: string;

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

  @OneToOne(() => Address, (address) => address.user, { eager: true })
  @JoinColumn()
  address!: Address;

  @OneToMany(() => Review, (review) => review.user)
  reviews!: Review[];

  @OneToMany(() => Fine, (fine) => fine.user)
  fines!: Fine[];

  constructor(
    name: string,
    email: string,
    password: string,
    isAdm: boolean,
    cpf: string
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.isAdm = isAdm;
    this.cpf = cpf;
  }

  toJSON() {
    const { password, ...rest } = this;
    return rest;
  }
}
