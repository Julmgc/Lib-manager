import { Router } from "express";
import { ReviewController } from "../controllers/reviewController";
import { verifyIfBookExist } from "../middlewares/booksMidllewares";
import { userExists } from "../middlewares/userMiddlewares";

const reviewRouter = () => {
  const router = Router();

  router.get("/book/:id", verifyIfBookExist, ReviewController.getBookReviews);

  router.get("/user/:userId", userExists, ReviewController.getUserReviews);

  router.get("", ReviewController.getAllReviews);

  return router;
};

export default reviewRouter;
