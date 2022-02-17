import { getCustomRepository } from "typeorm";
import BookRepository from "../repositories/bookRepository";

export class BookServices {
	static bookRepository = () => {
		return getCustomRepository(BookRepository);
	};

	static async updateBook(id: string, data: any) {
		const repository = this.bookRepository();
		const book = await repository.findOne(id);

		return await repository.save({
			...book, ...data
		});
	
	}
}
