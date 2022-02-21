import { NextFunction, Request, Response } from "express";
import { RetrieveServices } from "../services/retrieveServices";
import { ApiError } from "../utils/errors";
import { UserServices } from "../services/userServices";

export class changePassword {
  static changePasswordRoute = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = req.validatedFields;
      const code = await RetrieveServices.getCode(data.email);
      if (!code) {
        return new ApiError("Invalid Email", 422);
      }
      if (data.code != code.code) {
        return new ApiError("Invalid Code", 422);
      }
      await UserServices.updatePassword(data.newPassword, data.email);
      return res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  };
}
