import { NextFunction, Request, Response } from "express";
import { BookServices } from "../services/bookServices";

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