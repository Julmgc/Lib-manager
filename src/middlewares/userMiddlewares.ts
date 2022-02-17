import { NextFunction, Request, Response } from "express";
import { UserServices } from "../services/userServices";
import { ApiError } from "../utils/errors";
import { getCustomRepository } from "typeorm";
import UserRepository from "../repositories/userRepository";
import jwt from "jsonwebtoken";
import { jwtUserDataInterface } from "../types";

export const userExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    const user = await UserServices.findById(userId); /*.findById(userId) */
    if (user === undefined) {
      throw new ApiError("User not found!", 404);
    }
    next();
  } catch (err) {
    next(err);
  }
};

export const paramsVSjwt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    if (req.userDataByToken.isAdm) {
      return next();
    }
    if (userId !== req.userDataByToken.id) {
      throw new ApiError(
        "Admin privilegies needed to mess with others account!",
        401
      );
    }

    next();
  } catch (err) {
    next(err);
  }
};

export const verifyIfEmailExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserServices.getByEmail(req.validatedFields.email);

    if (!user) {
      return next();
    }
    throw new ApiError("E-mail already exists", 409);
  } catch (err) {
    next(err);
  }
};

export const userIsAdm = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.userDataByToken;
    if (user.isAdm) {
      return next();
    }
    throw new ApiError("Admin privilegies needed to this endpoint!", 401);
  } catch (err) {
    next(err);
  }
};

export const userFromJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jwtKey = process.env.JWT_SECRET_KEY || "jwtKey";
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : "";

    if (!token) {
      throw new ApiError(
        "Headers Authorization Bearer Token needed for this endpoint!",
        403
      );
    }

    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) {
        throw new ApiError("JWT invalid or expired", 400);
      }

      req.userDataByToken = decoded as jwtUserDataInterface;
      return next();
    });
  } catch (err) {
    next(err);
  }
};
