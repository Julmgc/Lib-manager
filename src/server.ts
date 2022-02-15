import app from "./app";
import startDBConnection from "./database";
import { DDCdata } from "./services/genreServices";

startDBConnection().then(()=> DDCdata.insert());

app.listen(process.env.PORT || 3000, () => {
	console.log("Running!");
});
