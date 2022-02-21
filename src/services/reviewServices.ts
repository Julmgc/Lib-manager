import { getCustomRepository } from "typeorm";
import Review from "../entities/reviewEntity";
import ReviewRepository from "../repositories/reviewRepository";

export class ReviewServices {
  static reviewRepository = () => {
    return getCustomRepository(ReviewRepository);
  };
  static getBooksReviews = async (
    id: string
  ): Promise<Array<Review> | undefined> => {
    const reviewRepo = this.reviewRepository();
    const reviews = await reviewRepo.find({
      where: {
        book: id,
      },
      select: ["id", "createdOn", "user", "reviewContent", "rating"],
    });

    return reviews;
  };
  static getUserReviews = async (
    id: string
  ): Promise<Array<Review> | undefined> => {
    const reviewRepo = this.reviewRepository();
    const reviews = await reviewRepo.find({
      where: {
        user: id,
      },
      select: ["id", "createdOn", "book", "reviewContent", "rating"],
    });

    return reviews;
  };
  static getAllReviews = async (): Promise<Array<Review> | undefined> => {
    const reviewRepo = this.reviewRepository();
    const reviews = await reviewRepo.find();
    return reviews;
  };
}
