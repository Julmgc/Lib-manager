import { Router } from "express";
import { BookController } from "../controllers/bookController";
import { bookExists } from "../middlewares/bookMiddlewares";

const bookRouter = () => {
	const router = Router();
    router.patch("/:bookId", bookExists, BookController.update)

    return router;
};

export default bookRouter;