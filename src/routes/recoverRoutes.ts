import { Router } from "express";
import { EmailController } from "../controllers/emailController";
import validateReqFields from "../middlewares/validateFields";
import changePasswordSchema from "../schemas/changePasswordSchema";

const retrieveRouter = () => {
	const router = Router();

	router.post("/retrieve", EmailController.postEmailRetrieve);

    router.post(
		"/change",
		validateReqFields(changePasswordSchema),
		EmailController.changePasswordRoute
	);

	return router;
};

export default retrieveRouter;
