import { Router } from "express";
import { ReviewController } from "../controllers/reviewController";
import { verifyIfBookExist } from "../middlewares/booksMidllewares";
import validateReqFields from "../middlewares/validateFields";
import { userFromJwt } from "../middlewares/userMiddlewares";
import reviewSchema from "../schemas/reviewSchema";

const reviewRouter = () => {
  const router = Router();

  router.get("/book/:id", verifyIfBookExist, ReviewController.getBookReviews);
  router.post(
    "/book/:bookId",
    validateReqFields(reviewSchema),
    userFromJwt,
    ReviewController.postReview
  );

  return router;
};

export default reviewRouter;
