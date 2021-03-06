import { NextFunction, Request, Response } from "express";
import { BookServices } from "../services/bookServices";
import { ReviewServices } from "../services/reviewServices";

export class ReviewController {
  static postReview = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.userDataByToken.id;
      const bookId = req.params.bookId;
      const reviewBody = req.body;
      const review = await ReviewServices.insertReviews(
        bookId,
        userId,
        reviewBody
      );
      return res.status(201).json(review);
    } catch (err) {
      next(err);
    }
  };

  static deleteReview = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { reviewId } = req.params;
      const userId = req.userDataByToken.id;
      await ReviewServices.deleteReview(reviewId, userId);
      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  };

  static updateReview = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = req.body;
      const { reviewId } = req.params;
      const userId = req.userDataByToken.id;
      const updatedReview = await ReviewServices.updateReview(
        reviewId,
        data,
        userId
      );
      return res.status(202).json(updatedReview);
    } catch (err) {
      next(err);
    }
  };
  static getAllReviews = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const reviews = await ReviewServices.getAllReviews();
      res.json(reviews);
    } catch (err) {
      next(err);
    }
  };
  static getUserReviews = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.params.userId;
      const reviews = await ReviewServices.getUserReviews(userId);
      res.json(reviews);
    } catch (err) {
      next(err);
    }
  };
  static getBookReviews = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const reviews = await ReviewServices.getBooksReviews(id);
      res.json(reviews);
    } catch (err) {
      next(err);
    }
  };
}
