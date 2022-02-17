import { Request, Response, NextFunction } from "express";
import { BookServices } from "../services/bookServices";
import { ApiError } from "../utils/errors";

export const verifyIfBookExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const book = await BookServices.findOneBook(id);

    if (book) {
      return next();
    }

    return new ApiError("Book not found", 404);
  } catch (e) {
    return new ApiError("Invalid id params, expect uuid format", 400);
  }
};
