import { NextFunction, Request, Response } from "express";
import { GenreServices } from "../services/genreServices";

export class GenreController {
	static getAll = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const page = req.query.page
				? parseInt(req.query.page as string)
				: undefined;
			const per_page = req.query.per_page
				? parseInt(req.query.per_page as string)
				: undefined;

			//ex: http://localhost/3000/genres?per_page=5&page=2
			const genres = await GenreServices.getAll(page, per_page);

			return res.json(genres);
		} catch (err) {
			next(err);
		}
	};

	static getByCode = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { ddc } = req.params;

			const code = await GenreServices.getByCode(ddc);

			return res.json(code);
		} catch (err) {
			next(err);
		}
	};
}
