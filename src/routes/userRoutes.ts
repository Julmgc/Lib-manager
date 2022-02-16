import { Router } from "express"
import { UserController } from "../controllers/userController";
import { paramsVSjwt, userExists } from "../middlewares/userMiddlewares";

const userRouter = () => {
    const router = Router();

    router.delete("/:userId", userExists, paramsVSjwt, UserController.deleteUser)

    return router;
};

export default userRouter;