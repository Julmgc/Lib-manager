import { getCustomRepository } from "typeorm";
import UserRepository from "../repositories/userRepository";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/errors";

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
