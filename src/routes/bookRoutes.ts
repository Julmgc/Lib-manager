import { Router } from "express";
import { BookController } from "../controllers/bookController";
import bookSchema from "../schemas/bookSchema";
import validateReqFields from "../middlewares/validateFields";
import { userFromJwt, userIsAdm } from "../middlewares/userMiddlewares";
import { verifyIfBookExist } from "../middlewares/booksMidllewares";
import { verifyUUIDFormat } from "../middlewares/apiMiddlewares";

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

  router.get(
		"/:id",
		verifyUUIDFormat,
		verifyIfBookExist,
		BookController.getOne
  );

  router.patch(
		"/:id",
		verifyUUIDFormat,
		verifyIfBookExist,
		userFromJwt,
		userIsAdm,
		BookController.update
  );

  router.delete(
		"/:id",
		verifyUUIDFormat,
		verifyIfBookExist,
		userFromJwt,
		userIsAdm,
		BookController.deleteBook
  );

  return router;
};

export default bookRouter;
