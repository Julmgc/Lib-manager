import { NextFunction, Request, Response } from "express";
import { ReviewServices } from "../services/reviewServices";
export class ReviewController {
  static postReview = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
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

      return res.send(updatedReview);
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
    } catch (err) {
      next(err);
    }
  };
}
