import { getCustomRepository } from "typeorm";
import Review from "../entities/reviewEntity";
import ReviewRepository from "../repositories/reviewRepository";
import { review } from "../types/index";
import { UserServices } from "./userServices";
import { BookServices } from "./bookServices";
import { ApiError } from "../utils/errors";
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

  static async updateReview(reviewId: string, data: any, userId: any) {
    const repository = this.reviewRepository();
    const review = await repository.findOne(reviewId);
    if (review?.user.id == userId) {
      await repository.save({
        ...review,
        ...data,
      });
      const updatedReview = await repository.findOne(reviewId);
      return updatedReview;
    } else {
      throw new ApiError("You can only update your own review", 401);
    }
  }

  static async deleteReview(reviewId: string) {
    const repository = this.reviewRepository();
    const review = await repository.findOne(reviewId)
    if(!review) {
      throw new ApiError("Review not found!", 401)
    }
    return await repository.delete(reviewId);
  }
}
