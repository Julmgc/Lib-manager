import { NextFunction, Request, Response } from "express";
import { BookServices } from "../services/bookServices";
import { ApiError } from "../utils/errors";


export const bookExists = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { bookId } = req.params;

		const book = await BookServices /*.findById(bookId) */
		if (!book) {
			throw new ApiError("Book not found!", 404);
		}
		next();
	} catch (err) {
		next(err);
	} 
};
