import { getCustomRepository } from "typeorm";
import UserBooksRepository from "../repositories/userBooksRepository";
import UserRepository from "../repositories/userRepository";
import BookRepository from "../repositories/bookRepository";
export class UserBooksServices {
  static userBooksRepository = () => {
    return getCustomRepository(UserBooksRepository);
  };

  static async loanBook(data: any, bookId: any) {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne({ email: data.email });

    if (!user) {
      return "User not found";
    }

    const bookRepository = getCustomRepository(BookRepository);
    const book = await bookRepository.findOne({ id: bookId });
    if (!book) {
      return "Book not found";
    }

    const userBooksRepository = getCustomRepository(UserBooksRepository);
    const user_book = userBooksRepository.create({ user: user, book: book });

    return await bookRepository.findOne({ id: bookId });
  }
}
