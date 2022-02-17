import { Express } from "express";
import bookRouter from "./bookRoutes";
import genreRouter from "./genreRoutes";
import userRouter from "./userRoutes";
import bookRouter from "./bookRoutes";

const startRoutes = (app: Express) => {
<<<<<<< HEAD
	app.use("/user", userRouter());
	app.use("/genres", genreRouter());
	app.use("/book", bookRouter());

	return app;
=======
  app.use("/user", userRouter());
  app.use("/genres", genreRouter());
  app.use("/book", bookRouter());
  return app;
>>>>>>> 4ae80ca5b8ab749243cc435527ffb0f42803f627
};

export default startRoutes;
