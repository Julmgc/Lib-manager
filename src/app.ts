import "reflect-metadata";
import express from "express";
import startRoutes from "./routes";
import { handleError } from "./utils/errors";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../swagger.json";
import dotenv from "dotenv";


dotenv.config();

const app = express();

app.use(express.json());

startRoutes(app);

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(handleError);

export default app;
