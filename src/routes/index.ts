import { Express } from "express";
import userRouter from "./userRoutes";

const startRoutes = (app: Express) => {
	app.use("/user", userRouter())

	return app;
};

export default startRoutes;
