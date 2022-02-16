import { NextFunction, Request, Response } from "express";
import { UserServices } from "../services/userServices";

export class UserController {
    static deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = req.params;

        await UserServices.remove(userId);

        res.status(204).send();
    }
}