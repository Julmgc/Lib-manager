import { getCustomRepository } from "typeorm";
import BookRepository from "../repositories/bookRepository";
import { bookInterface } from "../types/index";
import { UserServices } from "./userServices";
import { GenreServices } from "./genreServices";

export class BookServices {
  static bookRepository = () => {
    return getCustomRepository(BookRepository);
  };

  static insertBook = async (body: bookInterface, userId: string) => {
    const bookRepo = this.bookRepository();
    const genreRepo = GenreServices.genreRepository();
    const genre = await genreRepo.findOne(body.genreCdd);
    const userRepo = UserServices.userRepository();
    const user = await userRepo.findOne(userId);
    const book = bookRepo.create({
      name: body.name,
      author: body.author,
      pages: body.pages,
      genre: genre,
      admin: user,
    });

    await bookRepo.save(book);
    return book;
  };
}
