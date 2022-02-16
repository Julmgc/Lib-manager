import { Response, Request } from "express";
import { AddressServices } from "../services/addressServices";
import { UserServices } from "../services/userServices";
import { userInterface } from "../types";

export const postUserRoute = async (req: Request, res: Response) => {
  const userData = req.validatedFields as userInterface;
  const address = await AddressServices.createAdress(userData.address);
  userData.address.id = address.id;
  const user = UserServices.createUser(userData);
  return res.status(201).json(user);
};
