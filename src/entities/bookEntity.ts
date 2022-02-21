import internal from "stream";
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
} from "typeorm";
import { bookInterface } from "../types";

import Fine from "./fineEntity";
import Genre from "./genreEntity";
import UserBooks from "./userBooksEntity";
import User from "./userEntity";

@Entity("books")
export default class Book {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: false })
  author!: string;

  @Column({ nullable: false })
  pages!: number;

  @CreateDateColumn({ nullable: false })
  published_date!: Date;

  @ManyToOne(() => Genre, { eager: true })
  genre!: Genre;

  @ManyToOne(() => User)
  admin!: User;

  @OneToMany(() => UserBooks, (userBooks) => userBooks.book)
  loan!: UserBooks;

  @Column()
  loaned!: boolean;

  toJSON() {
    const { admin, ...book } = this;
    const json: any = {
      admin: {
        id: admin.id,
        name: admin.name,
      },
      book,
    };

    return json;
  }
}
