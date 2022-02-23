import { Router } from "express";
import { FineController } from "../controllers/fineController";
import { userFromJwt, userIsAdm } from "../middlewares/userMiddlewares";

const fineRouter = () => {
  const router = Router();

  router.get("/", userFromJwt, userIsAdm, FineController.getAll);

  return router;
};

export default fineRouter;
