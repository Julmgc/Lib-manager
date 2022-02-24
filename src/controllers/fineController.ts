import { NextFunction, Request, Response } from "express";
import { FineServices } from "../services/fineServices";
import { ApiError } from "../utils/errors";

export class FineController {
	static getAll = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const fines = await FineServices.getAll();

			return res.json(fines);
		} catch (err) {
			console.log(err);
			next(err);
		}
	};

	static getUserFines = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { id } = req.userDataByToken;
			const fines = await FineServices.getUserFines(id);

			return res.json(fines);
		} catch (err) {
			console.log(err);
			next(err);
		}
	};

	static payFine = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { fineId } = req.params;
			await FineServices.payFine(fineId);

			return res.sendStatus(204);
		} catch (err) {
			next(new ApiError("Fine not found", 404));
		}
	};
}
