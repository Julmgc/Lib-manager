import { NextFunction, Request, Response } from "express";
import { BookServices } from "../services/bookServices";
import { UserBooksServices } from "../services/userBooksServices";
export class BookController {
	static postBookRoute = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const bookData = req.body;
			const userId = req.userDataByToken.id;
			const book = await BookServices.insertBook(bookData, userId);
			return res.status(201).json(book);
		} catch (err) {
			next(err);
		}
	};

	static deleteBookRoute = async (req: Request, res: Response) => {
		const { id } = req.params;
		await BookServices.deleteBook(id);
		return res.sendStatus(204);
	};

	static loanBookRoute = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const data = req.body;
			const bookId = req.params;
			const loanedBook = await UserBooksServices.loanBook(data, bookId);
			return res.status(201).json(loanedBook);
		} catch (err) {
            console.log(err)
			next(err);
		}
	};

	static getAll = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const books = await BookServices.getAllBooks(req.query);
			res.json(books);
		} catch (err) {
			next(err);
		}
	};

	static update = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const data = req.body;
			const { id } = req.params;
			const updatedBook = await BookServices.updateBook(id, data);

			return res.send(updatedBook);
		} catch (err) {
			next(err);
		}
	};

	static returnBookRoute = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { bookId } = req.params;

			const returnedBook = await UserBooksServices.returnBook(bookId);

			return res.send(returnedBook);
		} catch (err) {
			next(err);
		}
	};

    static renewBook = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
        try {
            const { bookId } = req.params;
            const renew = await UserBooksServices.renew(bookId);

            res.json(renew);
        } catch (err) {
            console.log(err)
            next(err);
        }
    }
}
