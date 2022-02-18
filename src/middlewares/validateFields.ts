import * as yup from "yup";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/errors";
import { userInterface } from "../types";

const validateReqFields =
  (schema: yup.ObjectSchema<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedFields = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      if (validatedFields.address) {
        Object.keys(validatedFields.address).forEach((key) => {
          if (
            validatedFields.address[
              key as keyof typeof validatedFields.address
            ] === undefined
          ) {
            delete validatedFields.address[
              key as keyof typeof validatedFields.address
            ];
          }
        });
        if (Object.keys(validatedFields.address).length < 1) {
          delete validatedFields["address"];
        }
      }
      req.validatedFields = validatedFields;

      next();
    } catch (err) {
      next(new ApiError({ [(err as any).name]: (err as any).errors }, 400));
    }
  };

export default validateReqFields;
