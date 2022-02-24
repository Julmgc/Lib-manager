import { Router } from "express";
import { FineController } from "../controllers/fineController";
import {
  userFromJwt,
  userIsAdm,
  userExists,
  paramsVSjwt,
} from "../middlewares/userMiddlewares";

const fineRouter = () => {
  const router = Router();

  router.get("/", userFromJwt, userIsAdm, FineController.getAll);
  router.get(
    "/:userId",
    userExists,
    userFromJwt,
    paramsVSjwt,
    FineController.getByUser
  );

  return router;
};

export default fineRouter;
