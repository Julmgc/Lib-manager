import { Router } from "express"
import { GenreController } from "../controllers/genreController";

const genreRouter = () => {
    const router = Router();

    router.get('/', GenreController.getAll);
    router.get('/:ddc', GenreController.getByCode)

    return router;
};

export default genreRouter;