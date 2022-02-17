import { Router } from "express";
import { BookController } from "../controllers/bookController";
import bookSchema from "../schemas/bookSchema";
import validateReqFields from "../middlewares/validateFields";
import { userFromJwt, userIsAdm } from "../middlewares/userMiddlewares";
import { verifyIfBookExist } from "../middlewares/booksMidllewares";

const bookRouter = () => {
<<<<<<< HEAD
    const router = Router();
    router.post(
        "/",
        validateReqFields(bookSchema),
        userFromJwt,
        userIsAdm,
        BookController.postBookRoute
    );
    router.get("/", BookController.getAll);
    router.patch("/:bookId", verifyIfBookExist, BookController.update)
    router.delete("/:id", verifyIfBookExist, BookController.deleteBookRoute);
    return router;
=======
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
>>>>>>> 92ebe29b070a3183f7f2d099a594c272f63c38d0
};

export default bookRouter;
