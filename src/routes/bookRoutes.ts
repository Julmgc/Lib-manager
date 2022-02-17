import { Router } from "express";
import { BookController } from "../controllers/bookController";
import bookSchema from "../schemas/bookSchema";
import validateReqFields from "../middlewares/validateFields";
import { userFromJwt, userIsAdm } from "../middlewares/userMiddlewares";

const bookRouter = () => {
  const router = Router();
  router.post(
    "",
    validateReqFields(bookSchema),
    userFromJwt,
    userIsAdm,
    BookController.postBookRoute
  );

  return router;
};

export default bookRouter;
