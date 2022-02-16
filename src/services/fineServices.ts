import { getCustomRepository } from "typeorm";
import FineRepository from "../repositories/fineRepository";

export class FineServices {
	static fineRepository = () => {
		return getCustomRepository(FineRepository);
	};
}
