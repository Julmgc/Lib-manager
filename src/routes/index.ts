import { Express } from "express";
import bookRouter from "./bookRoutes";
import genreRouter from "./genreRoutes";
import userRouter from "./userRoutes";
import retrieveRouter from "./retrieveRoute";
import changePasswordRouter from "./changePasswordRoutes";
import loanRouter from "./loanRoutes";
import reviewRouter from "./reviewRoutes";

const startRoutes = (app: Express) => {
  app.use("/user", userRouter());
  app.use("/genres", genreRouter());
  app.use("/book", bookRouter());
  app.use("/retrieve", retrieveRouter());
  app.use("/change", changePasswordRouter());
  app.use("/book", loanRouter());
  app.use("reviews", reviewRouter());

  return app;
};

export default startRoutes;
