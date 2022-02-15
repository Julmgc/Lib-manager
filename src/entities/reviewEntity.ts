// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   CreateDateColumn,
//   Column,
//   ManyToOne,

// } from "typeorm";
// // import User from "./User";
// // import Book from "./Book";

// @Entity("reviews")
// export default class Review {
//   @PrimaryGeneratedColumn("uuid")
//   id: string;

//   @ManyToOne(() => User, {eager: true})
//   user: User;

//   @ManyToOne(() =>  Book, {eager: true})
//   book: Book

//   @CreateDateColumn()
//   createdOn!: Date;

// }
