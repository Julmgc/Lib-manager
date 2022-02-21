import { Express } from "express";
import bookRouter from "./bookRoutes";
import genreRouter from "./genreRoutes";
import userRouter from "./userRoutes";
import retrieveRouter from "./retrieveRoute";
import changePasswordRouter from "./changePasswordRoutes";

const startRoutes = (app: Express) => {
  app.use("/user", userRouter());
  app.use("/genres", genreRouter());
  app.use("/book", bookRouter());
  app.use("/retrieve", retrieveRouter());
  app.use("/change", changePasswordRouter());
  return app;
};

export default startRoutes;
