import { Express } from "express";
import genreRouter from "./genreRoutes";
import userRouter from "./userRoutes";

const startRoutes = (app: Express) => {
	app.use("/user", userRouter());
	app.use("/genres", genreRouter());

	return app;
};

export default startRoutes;
