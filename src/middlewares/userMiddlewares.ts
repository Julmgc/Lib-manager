import { NextFunction, Request, Response } from "express";
import { UserServices } from "../services/userServices";
import { ApiError } from "../utils/errors";
import { getCustomRepository } from "typeorm";
import UserRepository from "../repositories/userRepository";

export const userExists = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { userId } = req.params;

		const user = await UserServices.findById(userId); /*.findById(userId) */
		if (user === undefined) {
			throw new ApiError("User not found!", 404);
		}
		next();
	} catch (err) {
		next(err);
	} 
};

export const paramsVSjwt = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { userId } = req.params;

		if (req /*.user.isAdmin*/) {
			return next();
		}
		if (userId !== req /*.user.id*/) {
			throw new ApiError(
				"Admin privilegies needed to mess with others account!",
				401
			);
		}

		next();
	} catch (err) {
		next(err);
	}
};

export const verifyIfEmailExists = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const user = await UserServices.getByEmail(req.validatedFields.email);
        
		if (!user) {
			return next();
		}
		throw new ApiError("E-mail already exists", 409);
	} catch (err) {
		next(err);
	}
};

export const isAdm = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const user = req.userDataByToken;
		if (user.isAdm) {
			return next();
		}
		return res.status(401).json({ message: "Unauthorized" });
	} catch (err) {
		next(err);
	}
};
