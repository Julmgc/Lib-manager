import { Router } from "express";
import { UserController } from "../controllers/userController";
import { verifyUUIDFormat } from "../middlewares/apiMiddlewares";
import {
  paramsVSjwt,
  userExists,
  userFromJwt,
  userIsAdm,
} from "../middlewares/userMiddlewares";
import { verifyIfEmailExists } from "../middlewares/userMiddlewares";
import validateReqFields from "../middlewares/validateFields";
import { updateUserSchema, userSchema } from "../schemas/userSchema";

const userRouter = () => {
  const router = Router();

  router.post(
    "/",
    validateReqFields(userSchema),
    verifyIfEmailExists,
    UserController.postUser
  );

  router.get("/", userFromJwt, userIsAdm, UserController.getUsers);

  router.get(
    "/:userId",
    verifyUUIDFormat,
    userExists,
    userFromJwt,
    paramsVSjwt,
    UserController.getUser
  );

  router.post("/login", UserController.loginUser);

  router.patch(
    "/",
    validateReqFields(updateUserSchema),
    userFromJwt,
    UserController.updateUser
  );

  return router;
};

export default userRouter;
