import { getCustomRepository } from "typeorm";
import BookRepository from "../repositories/bookRepository";

export class BookServices {
	static bookRepository = () => {
		return getCustomRepository(BookRepository);
	};
}
