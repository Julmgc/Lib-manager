import { Router } from "express";
import { EmailController } from "../controllers/emailController";

const retrieveRouter = () => {
  const router = Router();

  router.post("", EmailController.postEmailRetrieve);

  return router;
};

export default retrieveRouter;
