import { Router } from "express";
import { FineController } from "../controllers/fineController";
import { verifyUUIDFormat } from "../middlewares/apiMiddlewares";
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
    verifyUUIDFormat,
    userExists,
    userFromJwt,
    paramsVSjwt,
    FineController.getUserFines
  );

  router.post("/pay/:fineId", userFromJwt, userIsAdm, FineController.payFine);

  return router;
};

export default fineRouter;
