import { Router } from "express";
import { paramsVSjwt, userExists } from "../middlewares/userMiddlewares";
import { verifyIfEmailExists } from "../middlewares/userMiddlewares";
import { BookController } from "../controllers/bookController";
const bookRouter = () => {
  const router = Router();
  router.post(
    "/loan/:bookId",
    verifyIfEmailExists,
    BookController.loanBookRoute
  );

  return router;
};

export default bookRouter;
