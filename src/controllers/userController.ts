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
    try {
      const { userId } = req.params;

      await UserServices.remove(userId);

      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };

  static postUserRoute = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userData = req.validatedFields as userInterface;
      const address = await AddressServices.createAdress(userData.address);
      userData.address.id = address.id;
      const user = await UserServices.createUser(userData);
      return res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  };

  static getUsers = async (
    resq: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const users = await UserServices.getAllUser();
      if (!users) {
        return res.status(404).json({ error: "No data Found" });
      }
      return res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  };

  static getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      const user = await UserServices.findById(userId);

      return res.send(user);
    } catch (err) {
      next(err);
    }
  };

  static loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, password, isAdm } = req.body;

      const token = await UserServices.login({
        email,
        password,
        isAdm,
      });

    //   const token = await loginUserService.execute({
    //     email,
    //     password,
    //     isAdm,
    //   });

      return res.json(token);
    } catch (err) {
		next(err)
    //   return res.status(401).json({ message: (<Error>error).message });
    }
  };

  static updateUserRoute = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = req.validatedFields;
      console.log(data)
      const userId = req.userDataByToken.id;
      const updatedUser = await UserServices.updateUser(data, userId);
      return res.status(200).json(updatedUser);
    } catch (err) {
      console.log(err)
      next(err);
    }
  };
}
