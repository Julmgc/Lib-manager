import { Router } from "express";
import { EmailController } from "../controllers/emailController";

const emailRouter = () => {
    const router = Router();
  
    router.post("", EmailController.sendEmail);
  
    return router;
  };
  
  export default emailRouter;