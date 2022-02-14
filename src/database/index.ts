import { createConnection } from "typeorm";

const startDBConnection = async () => {
	try {
		return await createConnection();
	} catch (err) {
		console.log(err);
	}
};

export default startDBConnection;
