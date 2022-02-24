import { NextFunction, Request, Response } from "express";
import { BookServices } from "../services/bookServices";

export class BookController {
  static postBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookData = req.body;
      const userId = req.userDataByToken.id;
      const book = await BookServices.insertBook(bookData, userId);
      return res.status(201).json(book);
    } catch (err) {
      next(err);
    }
  };

  static deleteBook = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      await BookServices.deleteBook(id);
      return res.sendStatus(204);
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

  static getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const book = await BookServices.findOneBook(id);
      res.json(book);
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
}
