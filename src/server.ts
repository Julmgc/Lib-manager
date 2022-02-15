import app from "./app";
import startDBConnection from "./database";

startDBConnection();

app.listen(process.env.PORT || 3000, () => {
  console.log("Running!");
});
