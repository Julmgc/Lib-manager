import { Express } from "express";
import bookRouter from "./bookRoutes";
import genreRouter from "./genreRoutes";
import userRouter from "./userRoutes";
import retrieveRouter from "./recoverRoutes";
import loanRouter from "./loanRoutes";
import reviewRouter from "./reviewRoutes";
import emailRouter from "./emailRoute";
import fineRouter from "./fineRoutes";

const startRoutes = (app: Express) => {
  app.use("/user", userRouter());
  app.use("/genres", genreRouter());
  app.use("/book", loanRouter());
  app.use("/book", bookRouter());
  app.use("/", retrieveRouter());
  app.use("/reviews", reviewRouter());
  app.use("/email", emailRouter());
  app.use("/fines", fineRouter());

  return app;
};

export default startRoutes;
