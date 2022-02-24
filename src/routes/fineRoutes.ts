import { Router } from "express";
import { FineController } from "../controllers/fineController";
import { userFromJwt, userIsAdm } from "../middlewares/userMiddlewares";

const fineRouter = () => {
  const router = Router();

  router.get("/", userFromJwt, userIsAdm, FineController.getAll);

  router.get("/user", userFromJwt, FineController.getUserFines);

  router.post("/pay/:fineId", userFromJwt, userIsAdm, FineController.payFine);

  return router;
};

export default fineRouter;
