import { Router } from "express";
import { BookController } from "../controllers/bookController";
import bookSchema from "../schemas/bookSchema";
import validateReqFields from "../middlewares/validateFields";
import { userFromJwt, userIsAdm } from "../middlewares/userMiddlewares";
import { verifyIfBookExist } from "../middlewares/booksMidllewares";

const bookRouter = () => {
  const router = Router();
  router.post(
    "/",
    validateReqFields(bookSchema),
    userFromJwt,
    userIsAdm,
    BookController.postBookRoute
  );
  router.get("/", BookController.getAll);

  router.delete("/:id", verifyIfBookExist, BookController.deleteBookRoute);

  router.post(
    "/loan/:bookId",
    userFromJwt,
    userIsAdm,
    BookController.loanBookRoute
  );
  return router;
};

export default bookRouter;
