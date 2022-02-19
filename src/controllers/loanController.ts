import { NextFunction, Request, Response } from "express";
import { UserBooksServices } from "../services/userBooksServices";

export class LoanController {
	static loanBook = async (
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
			console.log(err);
			next(err);
		}
	};

	static returnBook = async (
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
			console.log(err);
			next(err);
		}
	};
};

