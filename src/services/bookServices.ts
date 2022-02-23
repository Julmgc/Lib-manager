import { getCustomRepository, ILike, Like } from "typeorm";
import BookRepository from "../repositories/bookRepository";
import { bookInterface, getAllBooksQuerys } from "../types/index";
import { UserServices } from "./userServices";
import { GenreServices } from "./genreServices";
import Genre from "../entities/genreEntity";
import genreRouter from "../routes/genreRoutes";
import { ApiError } from "../utils/errors";
import UserBooksRepository from "../repositories/userBooksRepository";
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
      loaned: false,
    });

    await bookRepo.save(book);
    return book;
  };

  static getAllBooks = async ({
    page = 1,
    per_page = 10,
    author,
    ddc,
    category,
  }: getAllBooksQuerys) => {
    const query = {
      author: author ? ILike(`%${author}%`) : undefined,
      genre: ddc
        ? ddc
        : category
        ? { description: ILike(`%${category}%`) }
        : undefined,
    };
    Object.keys(query).forEach((key) => {
      if (query[key as keyof typeof query] === undefined) {
        delete query[key as keyof typeof query];
      }
    });

    const books = await this.bookRepository().find({
      relations: ["genre"],
      skip: per_page * (page - 1),
      take: per_page,
      where: query,
      order: {
        name: "ASC",
      },
    });

    if (books.length < 1) {
      throw new ApiError("No results found!", 404);
    }

    return books;
  };

  static deleteBook = async (id: string) => {
    const bookRepo = this.bookRepository();
    const book = await bookRepo.findOne({ id });
    if (!book) {
      throw new ApiError("Book doesn't exist", 404);
    }
    if (book.loaned) {
      throw new ApiError(
        "You can't delete a book that is currently loaned",
        403
      );
    }
    await bookRepo.delete(id);
    return;
  };

  static findOneBook = async (id: string) => {
    const bookRepo = this.bookRepository();
    const book = await bookRepo.findOne({ id });

    if (!book) {
      throw new ApiError("Book not found!", 404);
    }
    return book;
  };

  static async updateBook(id: string, data: any) {
    const repository = this.bookRepository();
    const book = await repository.findOne(id);

    return await repository.save({
      ...book,
      ...data,
    });
  }
}
