import { Router } from "express";
import { userFromJwt, userIsAdm } from "../middlewares/userMiddlewares";
import { ReviewController } from "../controllers/reviewController";
const reviewRouter = () => {
  const router = Router();

  router.patch("/:reviewId", userFromJwt, ReviewController.updateReview);

  return router;
};

export default reviewRouter;
