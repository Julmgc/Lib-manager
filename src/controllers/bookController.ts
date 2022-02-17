import { NextFunction, Request, Response } from "express";
import { UserServices } from "../services/userServices";
import { AddressServices } from "../services/addressServices";
import { userInterface } from "../types";
import { UserBooksServices } from "../services/userBooksServices";

export class BookController {
  static loanBookRoute = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = req.body;
      const bookId = req.params;
      const updatedUser = await UserBooksServices.loanBook(data, bookId);
      return res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  };
}
