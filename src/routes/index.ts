import { Express } from "express";
import genreRouter from "./genreRoutes";
import userRouter from "./userRoutes";
import bookRouter from "./bookRouter";

const startRoutes = (app: Express) => {
  app.use("/user", userRouter());
  app.use("/genres", genreRouter());
  app.use("/book", bookRouter());

  return app;
};

export default startRoutes;
