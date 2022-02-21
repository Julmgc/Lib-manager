import { getCustomRepository } from "typeorm";
import ReviewRepository from "../repositories/reviewRepository";
import { ApiError } from "../utils/errors";

export class ReviewServices {
  static reviewRepository = () => {
    return getCustomRepository(ReviewRepository);
  };

  static async updateReview(reviewId: string, data: any, userId: any) {
    const repository = this.reviewRepository();
    const review = await repository.findOne(reviewId);
    if (review?.user.id == userId) {
      return await repository.save({
        ...review,
        ...data,
      });
    } else {
      throw new ApiError("You can only update your own review", 401);
    }
  }
}
