import { Router } from "express";
import { EmailController } from "../controllers/emailController";
import validateReqFields from "../middlewares/validateFields";
import { userFromJwt, userIsAdm } from "../middlewares/userMiddlewares";
import emailSchema from "../schemas/emailSchema";


const emailRouter = () => {
    const router = Router();
  
    router.post("", validateReqFields(emailSchema), userFromJwt, userIsAdm, EmailController.sendEmail);
  
    return router;
  };
  
  export default emailRouter;