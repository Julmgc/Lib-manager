import { NextFunction, Request, Response } from "express";
import { BookServices } from "../services/bookServices";
<<<<<<< HEAD

export class BookController {
    static update = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const data = req.body;
          const { bookId } = req.params;
          const updatedBook = await BookServices.updateBook(bookId, data);

          return res.send(updatedBook);
        } catch (err) {
          next(err);
        }
      };
}
=======
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

	static getAll = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const books = await BookServices.getAllBooks(req.query);
			res.json(books);
		} catch (err) {
			next(err);
		}
	};

	static deleteBookRoute = async (req: Request, res: Response) => {
		const { id } = req.params;
		await BookServices.deleteBook(id);
		return res.sendStatus(204);
	};
}
>>>>>>> 4ae80ca5b8ab749243cc435527ffb0f42803f627
