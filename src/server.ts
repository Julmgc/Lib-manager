import app from "./app";
import startDBConnection from "./database";
import { GenreServices } from "./services/genreServices";

startDBConnection().then(() => GenreServices.insertBaseCodes());

app.listen(process.env.PORT || 3000, () => {
  console.log("Running!");
});
