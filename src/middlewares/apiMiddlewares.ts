import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/errors";

export const verifyUUIDFormat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    try {
		const id = Object.values(req.params)[0];

        if (id.match(/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/)){
            return next();
        }

		throw new ApiError("Use UUID format on id!", 400);
	} catch (err) {
		next(err);
	}
}