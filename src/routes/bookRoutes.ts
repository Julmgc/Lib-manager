import { Router } from "express";
import { BookController } from "../controllers/bookController";
import bookSchema from "../schemas/bookSchema";
import validateReqFields from "../middlewares/validateFields";

const bookRouter = () => {
  const router = Router();
  router.post(
    "/:id",
    validateReqFields(bookSchema),
    // userFromJwt,
    BookController.postBookRoute
  );

  return router;
};

export default bookRouter;
