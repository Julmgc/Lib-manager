import { NextFunction, Request, Response } from "express";
import { UserServices } from "../services/userServices";
import { AddressServices } from "../services/addressServices";
import { userInterface } from "../types";

export class UserController {
  static postUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.validatedFields as userInterface;

      const address = await AddressServices.createAdress(userData.address);
      userData.address.id = address.id;
      const user = await UserServices.createUser(userData, res);
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

      return res.json(token);
    } catch (err) {
      next(err);
    }
  };

  static updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = req.validatedFields;
      const userId = req.userDataByToken.id;
      const updatedUser = await UserServices.updateUser(data, userId);
      return res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  };
}
