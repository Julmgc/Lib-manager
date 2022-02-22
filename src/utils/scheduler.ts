import cron from "node-cron";
import axios from "axios";

const scheduler = () => {
    return cron.schedule("00 06 * * *", () => {
		axios
			.post(
				"https://pjp1safr7b.execute-api.us-east-1.amazonaws.com/dev/notice"
			)
			.catch((err) => {
				console.log(err);
			});

		axios
			.post(
				"https://pjp1safr7b.execute-api.us-east-1.amazonaws.com/dev/fines"
			)
			.catch((err) => {
				console.log(err);
			});
	});
};

export default scheduler;
