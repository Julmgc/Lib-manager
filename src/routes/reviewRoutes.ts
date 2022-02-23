import { Router } from "express";
import { ReviewController } from "../controllers/reviewController";
import { verifyIfBookExist } from "../middlewares/booksMidllewares";
import { userExists } from "../middlewares/userMiddlewares";
import validateReqFields from "../middlewares/validateFields";
import { userFromJwt } from "../middlewares/userMiddlewares";
import reviewSchema from "../schemas/reviewSchema";

const reviewRouter = () => {
    const router = Router();

    router.post(
        "/book/:bookId",
        validateReqFields(reviewSchema),
        userFromJwt,
        ReviewController.postReview
    );

    router.get("/book/:id", verifyIfBookExist, ReviewController.getBookReviews);

    router.get("/user/:userId", userExists, ReviewController.getUserReviews);

    router.get("", ReviewController.getAllReviews);

    router.patch("/:reviewId", userFromJwt, ReviewController.updateReview);

    router.delete("/:reviewId", ReviewController.deleteReview)
    return router;
};

export default reviewRouter;
