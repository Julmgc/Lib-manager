import { NextFunction, Request, Response } from "express";
import { BookServices } from "../services/bookServices";
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
}
