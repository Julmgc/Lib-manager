import { Express } from "express";
import bookRouter from "./bookRoutes";
import genreRouter from "./genreRoutes";
import userRouter from "./userRoutes";
import retrieveRouter from "./retrieveRoute";
import loanRouter from "./loanRoutes";

const startRoutes = (app: Express) => {
  app.use("/user", userRouter());
  app.use("/genres", genreRouter());
  app.use("/book", bookRouter());
  app.use("/retrieve", retrieveRouter());
  app.use("/book", loanRouter())

  return app;
};

export default startRoutes;
