import { Router } from "express";
import { verifyIfEmailExists } from "../middlewares/userMiddlewares";
import validateReqFields from "../middlewares/validateFields";
import userSchema from "../schemas/userSchema";

const userRouter = () => {
  const router = Router();
  router.post("", validateReqFields(userSchema), verifyIfEmailExists);

  return router;
};

export default userRouter;
