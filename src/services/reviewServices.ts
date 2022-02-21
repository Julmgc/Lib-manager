import { getCustomRepository } from "typeorm";
import Review from "../entities/reviewEntity";
import ReviewRepository from "../repositories/reviewRepository";
import { review } from "../types/index";
import { UserServices } from "./userServices";
import { BookServices } from "./bookServices";

export class ReviewServices {
  static reviewRepository = () => {
    return getCustomRepository(ReviewRepository);
  };
  static getReviews = async (
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
  static insertReviews = async (
    bookId: string,
    userId: string,
    body: review
  ) => {
    const userRepo = UserServices.userRepository();
    const user = await userRepo.findOne(userId);
    const bookRepo = BookServices.bookRepository();
    const book = await bookRepo.findOne(bookId);
    const reviewRepo = this.reviewRepository();

    const review = reviewRepo.create({
      user: user,
      book: book,
      rating: body.rating,
      reviewContent: body.reviewContent,
    });

    await reviewRepo.save(review);
    return review;
  };
}
