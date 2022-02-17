import { Router } from "express";
import { UserController } from "../controllers/userController";
import { paramsVSjwt, userExists } from "../middlewares/userMiddlewares";
import { verifyIfEmailExists } from "../middlewares/userMiddlewares";
import validateReqFields from "../middlewares/validateFields";
import userSchema from "../schemas/userSchema";

const userRouter = () => {
  const router = Router();
  router.post(
    "/",
    validateReqFields(userSchema),
    // verifyIfEmailExists,
    UserController.postUserRoute
  );

  router.delete("/:userId", userExists, paramsVSjwt, UserController.deleteUser);
  router.get("", UserController.getUsers);

  return router;
};

export default userRouter;
