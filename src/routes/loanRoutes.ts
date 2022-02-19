import { Router } from "express";
import { userFromJwt, userIsAdm } from "../middlewares/userMiddlewares";
import { LoanController } from "../controllers/loanController";

const loanRouter = () => {
	const router = Router();

    router.post(
		"/loan/:bookId",
		userFromJwt,
		userIsAdm,
		LoanController.loanBook
	);

    router.post(
		"/return/:bookId",
		userFromJwt,
		userIsAdm,
		LoanController.returnBook
	);

    router.post("/renew/:bookId", userFromJwt, LoanController.renewBook);

    router.get("/loan", LoanController.listLoaned);

    router.get("/loan/:userId", LoanController.loanedByUser);

    return router;
};

export default loanRouter;