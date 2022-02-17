import { getCustomRepository } from "typeorm";
import BookRepository from "../repositories/bookRepository";
import { bookInterface, getAllBooksQuerys } from "../types/index";
import { UserServices } from "./userServices";
import { GenreServices } from "./genreServices";
import Genre from "../entities/genreEntity";
import genreRouter from "../routes/genreRoutes";
import { ApiError } from "../utils/errors";

export class BookServices {
	static bookRepository = () => {
		return getCustomRepository(BookRepository);
	};

<<<<<<< HEAD
	static async updateBook(id: string, data: any) {
		const repository = this.bookRepository();
		const book = await repository.findOne(id);

		return await repository.save({
			...book, ...data
		});
	
	}
=======
	static insertBook = async (body: bookInterface, userId: string) => {
		const bookRepo = this.bookRepository();
		const genreRepo = GenreServices.genreRepository();
		const genre = await genreRepo.findOne(body.genreCdd);
		const userRepo = UserServices.userRepository();
		const user = await userRepo.findOne(userId);
		const book = bookRepo.create({
			name: body.name,
			author: body.author,
			pages: body.pages,
			genre: genre,
			admin: user,
		});

		await bookRepo.save(book);
		return book;
	};

	static getAllBooks = async ({
		page = 1,
		per_page = 10,
		author,
		ddc,
		category,
	}: getAllBooksQuerys) => {
		const query = {
			author: author,
			genre: ddc ? ddc : category ? { description: category } : undefined,
		};
		Object.keys(query).forEach((key) => {
			if (query[key as keyof typeof query] === undefined) {
				delete query[key as keyof typeof query];
			}
		});

		const books = await this.bookRepository().find({
			relations: ["genre"],
			skip: per_page * (page - 1),
			take: per_page,
			where: query,
			order: {
				name: "ASC",
			},
		});

		if (books.length < 1) {
			throw new ApiError("No results found!", 404);
		}

		return books;
	};

	static deleteBook = async (id: string) => {
		const bookRepo = this.bookRepository();
		await bookRepo.delete(id);
		return;
	};

	static findOneBook = async (id: string) => {
		const bookRepo = this.bookRepository();
		const book = await bookRepo.find({ id });
		return book;
	};
>>>>>>> 4ae80ca5b8ab749243cc435527ffb0f42803f627
}
