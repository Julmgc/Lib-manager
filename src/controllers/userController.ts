import { NextFunction, Request, Response } from "express";
import { UserServices } from "../services/userServices";
import { AddressServices } from "../services/addressServices";
import { userInterface } from "../types";

export class UserController {
	static deleteUser = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const { userId } = req.params;

		await UserServices.remove(userId);

		res.status(204).send();
	};

	static postUserRoute = async (req: Request, res: Response) => {
		const userData = req.validatedFields as userInterface;
		const address = await AddressServices.createAdress(userData.address);
		userData.address.id = address.id;
		const user = UserServices.createUser(userData);
		return res.status(201).json(user);
	};
}
