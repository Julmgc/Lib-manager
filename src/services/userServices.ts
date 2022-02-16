import { getCustomRepository } from "typeorm";
import UserRepository from "../repositories/userRepository";

export class UserServices {
	static userRepository = () => {
		return getCustomRepository(UserRepository);
	};
}
