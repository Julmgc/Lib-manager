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
    BookController.postBook
  );

  router.get("/", BookController.getAll);

  router.patch("/:id", verifyIfBookExist, BookController.update);

  router.delete("/:id", verifyIfBookExist, BookController.deleteBook);

  return router;
};

export default bookRouter;
