import { NextFunction, Request, Response } from "express";
import { UserServices } from "../services/userServices";
import { ApiError } from "../utils/errors";

export const userExists = (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    const user = UserServices/*.findById(userId) */;
    if (user === undefined) {
        throw new ApiError("User not found!", 404)
    }
    next();
};

export const paramsVSjwt = (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    if (req/*.user.isAdmin*/){
        return next();
    };

    if ( userId !== req/*.user.id*/) {
        throw new ApiError("Admin privilegies needed to mess with others account!", 401)
    };

    next();
}