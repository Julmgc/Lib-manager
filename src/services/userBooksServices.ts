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
    const userBooksRepository = getCustomRepository(UserBooksRepository);

    const user = await userRepository.findOne({ email: data.userEmail });

    if (!user) {
      return "User not found";
    }

    const bookRepository = getCustomRepository(BookRepository);
    const book = await bookRepository.findOne({ where: { id: bookId.bookId } });
    if (!book) {
      return "Book not found";
    }

    const loanedBook = await userBooksRepository.findOne({
      where: { book: bookId.bookId, user: user.id },
    });
    if (loanedBook) {
      return "This book was already loaned";
    }

    var dt = new Date();
    const renewDate = dt.setDate(dt.getDate() + 15);
    const renewDateFormat = dt.toISOString().substring(0, 10);

    const countUserBook = await userBooksRepository.findAndCount({
      where: { user: user.id },
    });

    if (countUserBook[1] >= 6) {
      return "User already has 6 books loaned.";
    }
    const userBook = await userBooksRepository.create({
      user: user,
      book: book,
      return_date: renewDateFormat,
    });

    await userBooksRepository.save(userBook);

    const bookLoaned = await bookRepository.findOne({
      where: { id: bookId.bookId },
    });
    if (!bookLoaned) {
      return "Book not found";
    }
    const bookData = { loaned: true };
    await bookRepository.update(bookLoaned.id, bookData);

    return await userBooksRepository.findOne({
      where: { user: user, book: book },
    });
  }

  static async returnBook(bookId: string) {
    const bookRepository = getCustomRepository(BookRepository);

    const book = await bookRepository.findOne({ where: { id: bookId } });
    if (!book) {
      return "Book not found";
    }

    const userBooksRepository = getCustomRepository(UserBooksRepository);

    const userBook = await userBooksRepository.findOne({
      book,
    });

    if (!userBook) {
      return "Book is not loaned";
    }

    await userBooksRepository.delete(userBook.id);

    const bookData = { loaned: false };
    await bookRepository.update(book.id, bookData);

    return await bookRepository.findOne({ where: { id: bookId } });
  }
}
