import { getCustomRepository } from "typeorm";
import UserBooksRepository from "../repositories/userBooksRepository";
import BookRepository from "../repositories/bookRepository";
import { BookServices } from "./bookServices";
import { ApiError } from "../utils/errors";
import { UserServices } from "./userServices";

export class UserBooksServices {
	static userBooksRepository = () => {
		return getCustomRepository(UserBooksRepository);
	};

	static async loanBook(data: any, bookId: any) {
		const userBooksRepository = this.userBooksRepository();

		const user = await UserServices.getByEmail(data.userEmail);
		if (!user) {
			throw new ApiError("User not found!", 404);
		}

		const bookRepository = getCustomRepository(BookRepository);
		const book = await BookServices.findOneBook(bookId.bookId);

		const loanedBook = await userBooksRepository.findOne({
			where: { book: bookId.bookId, user: user.id, returned: false },
		});
		if (loanedBook) {
			throw new ApiError("This book was already loaned", 400);
		}

		const countUserBook = await userBooksRepository.findAndCount({
			where: { user: user.id },
		});

		if (countUserBook[1] >= 6) {
			throw new ApiError("User already has 6 books loaned!", 400);
		}
		const userBook = userBooksRepository.create({
			user: user,
			book: book,
			returned: false,
		});

		await userBooksRepository.save(userBook);

		book.loaned = true;
		await bookRepository.save(book);

		return await userBooksRepository.findOne({
			where: { user: user, book: book, returned: false },
		});
	}

	static async returnBook(bookId: string) {
		const bookRepository = BookServices.bookRepository();

		const book = await BookServices.findOneBook(bookId);

		const userBooksRepository = this.userBooksRepository();

		const userBook = await userBooksRepository.findOne({
			where: { book: book, returned: false },
		});

		if (!userBook) {
			throw new ApiError("This book is not loaned!", 400);
		}

		const returnDate = new Date().toISOString();

		const returneBook = { returned: true, return_date: returnDate };

		await userBooksRepository.update(userBook.id, returneBook);

		const bookData = { loaned: false };
		await bookRepository.update(book.id, bookData);

		return await BookServices.findOneBook(bookId);
	}

	static renew = async (bookId: string) => {
		let book = BookServices.findOneBook(bookId);
		const loaned = await this.userBooksRepository().findOne({
			where: { book: { id: bookId } },
		});

		if (!loaned) {
			throw new ApiError("This book is not on loan!", 400);
		};
		if (loaned.renewed) {
			throw new ApiError("It's not possible to renew twice!", 400);
		};

		const oldDate = new Date(loaned.return_date);
		loaned.return_date = new Date(oldDate.setDate(oldDate.getDate() + 7));
		loaned.renewed = true;
		await this.userBooksRepository().save(loaned);

		return loaned;
	};

	static getLoaned = async (userId: string) => {
		const loanedBooks = await this.userBooksRepository().find({
			where: { returned: false, user: { id: userId } },
		});

		if (loanedBooks.length < 1) {
			throw new ApiError("No loans found for this user!", 404);
		};

		return loanedBooks;
	};

	static getAllLoaneds = async () => {
		const loanedBooks = await this.userBooksRepository().find({
			where: { returned: false },
		});

		if (loanedBooks.length < 1) {
			throw new ApiError("No loans found!", 404);
		};
		
		return loanedBooks;
	};
}
