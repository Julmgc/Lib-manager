import { Router } from "express";
import { ReviewController } from "../controllers/reviewController";
import { verifyIfBookExist } from "../middlewares/booksMidllewares";

const reviewRouter = () => {
  const router = Router();

  router.get("/book/:id", verifyIfBookExist, ReviewController.getBookReviews);

  return router;
};

export default reviewRouter;
