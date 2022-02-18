import { Express } from "express";
import bookRouter from "./bookRoutes";
import genreRouter from "./genreRoutes";
import userRouter from "./userRoutes";

const startRoutes = (app: Express) => {
	app.use("/user", userRouter());
	app.use("/genres", genreRouter());
	app.use("/book", bookRouter());

	return app;
};

export default startRoutes;
