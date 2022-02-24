import { Router } from "express";
import { EmailController } from "../controllers/emailController";
import validateReqFields from "../middlewares/validateFields";
import { verifyIfEmailExists } from "../middlewares/userMiddlewares";
import emailSchema from "../schemas/emailSchema";


const emailRouter = () => {
    const router = Router();
  
    router.post("", validateReqFields(emailSchema), verifyIfEmailExists, EmailController.sendEmail);
  
    return router;
  };
  
  export default emailRouter;