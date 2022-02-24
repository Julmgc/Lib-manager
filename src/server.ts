import app from "./app";
import startDBConnection from "./database";
import { GenreServices } from "./services/genreServices";
import scheduler from "./utils/scheduler";

startDBConnection().then(() => GenreServices.insertBaseCodes());

scheduler();

app.listen(process.env.PORT || 3000, () => {
  console.log("Running!");
});
