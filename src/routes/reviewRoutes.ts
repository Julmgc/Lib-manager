import { Router } from "express";
import { ReviewController } from "../controllers/reviewController";
import { verifyIfBookExist } from "../middlewares/booksMidllewares";
import { userExists } from "../middlewares/userMiddlewares";
import validateReqFields from "../middlewares/validateFields";
import { userFromJwt } from "../middlewares/userMiddlewares";
import reviewSchema from "../schemas/reviewSchema";
import { verifyUUIDFormat } from "../middlewares/apiMiddlewares";

const reviewRouter = () => {
  const router = Router();

  router.post(
    "/book/:bookId",
    validateReqFields(reviewSchema),
    verifyUUIDFormat,
    userFromJwt,
    ReviewController.postReview
  );

  router.get(
		"/book/:id",
		verifyUUIDFormat,
		verifyIfBookExist,
		ReviewController.getBookReviews
  );

  router.get(
		"/user/:userId",
		verifyUUIDFormat,
		userExists,
		ReviewController.getUserReviews
  );

  router.get("", ReviewController.getAllReviews);

  router.patch(
		"/:reviewId",
		verifyUUIDFormat,
		userFromJwt,
		ReviewController.updateReview
  );

  router.delete(
		"/:reviewId",
		verifyUUIDFormat,
		userFromJwt,
		ReviewController.deleteReview
  );
  return router;
};

export default reviewRouter;
