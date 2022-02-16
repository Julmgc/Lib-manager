<<<<<<< HEAD
import { UserServices } from "../services/userServices";
import { Request, Response, NextFunction } from "express";

export const getUsers = async (resq: Request, res: Response) => {
  const users = await UserServices.getAllUser();
  if (users) {
    return res.status(200).json(users);
  } else {
    return res.status(404).json({ error: "No data Found" });
  }
};
=======
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
>>>>>>> 08e0921ef1cc222420d19ca7c4325c1c333567d9
