import { Router } from "express";
import { userFromJwt, userIsAdm } from "../middlewares/userMiddlewares";
import { LoanController } from "../controllers/loanController";
import { verifyUUIDFormat } from "../middlewares/apiMiddlewares";

const loanRouter = () => {
	const router = Router();

    router.post(
		"/loan/:bookId",
		verifyUUIDFormat,
		userFromJwt,
		userIsAdm,
		LoanController.loanBook
	);

    router.post(
		"/return/:bookId",
		verifyUUIDFormat,
		userFromJwt,
		userIsAdm,
		LoanController.returnBook
	);

    router.post(
		"/renew/:bookId",
		verifyUUIDFormat,
		userFromJwt,
		LoanController.renewBook
	);

    router.get("/loan", userFromJwt, userIsAdm, LoanController.listLoaned);

    router.get(
		"/loan/:userId",
		verifyUUIDFormat,
		userFromJwt,
		LoanController.loanedByUser
	);

    return router;
};

export default loanRouter;