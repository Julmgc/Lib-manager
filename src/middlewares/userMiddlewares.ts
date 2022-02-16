import { NextFunction, Request, Response } from "express";
import { UserServices } from "../services/userServices";
import { ApiError } from "../utils/errors";
import { getCustomRepository } from "typeorm";
import UserRepository from "../repositories/userRepository";

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

export const verifyIfEmailExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepo = getCustomRepository(UserRepository);
  const user = await userRepo.find({
    where: {
      email: req.validatedFields.email,
    },
  });
  if (!user) {
    return next();
  }
  return new ApiError("Email already exists", 409);
};

export const isAdm = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.userDataByToken;
  if (user.isAdm) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
};
