import { EntityRepository, Repository } from "typeorm";
import Review from "../entities/reviewEntity";

@EntityRepository(Review)
export default class ReviewRepository extends Repository<Review> {}
