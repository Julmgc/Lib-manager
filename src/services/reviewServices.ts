import { getCustomRepository } from "typeorm";
import ReviewRepository from "../repositories/reviewRepository";

export class ReviewServices {
	static reviewRepository = () => {
		return getCustomRepository(ReviewRepository);
	};
}
