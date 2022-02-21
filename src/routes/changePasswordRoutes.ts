import { Router } from "express";
import { changePassword } from "../controllers/changePasswordController";
import validateReqFields from "../middlewares/validateFields";
import changePasswordSchema from "../schemas/changePasswordSchema";

const changePasswordRouter = () => {
  const router = Router();

  router.post(
    "",
    validateReqFields(changePasswordSchema),
    changePassword.changePasswordRoute
  );
  return router;
};

export default changePasswordRouter;
