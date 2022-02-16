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
