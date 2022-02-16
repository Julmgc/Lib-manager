import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";

import Genre from "./genreEntity";
import User from "./userEntity";

@Entity("books")
export class Book {
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

  @ManyToOne((type) => Genre, (genre) => genre.book)
  genre: Genre;

  @ManyToOne((type) => User, (user) => user.book)
  adminId: User;

  @OneToMany((type) => User, (user) => user.on_loan_to)
  user!: User;
}
