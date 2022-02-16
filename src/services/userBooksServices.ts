import { getCustomRepository } from "typeorm";
import UserBooksRepository from "../repositories/userBooksRepository";

export class UserBooksServices {
	static userBooksRepository = () => {
		return getCustomRepository(UserBooksRepository);
	};
}
