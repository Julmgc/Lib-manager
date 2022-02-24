import { NextFunction, Request, Response } from "express";
import { FineServices } from "../services/fineServices";

export class FineController {
  static getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const fines = await FineServices.getAll();

      return res.json(fines);
    } catch (err) {
      next(err);
    }
  };
  static getByUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId } = req.params;
      const fines = await FineServices.findById(userId);

      return res.send(fines);
    } catch (err) {
      next(err);
    }
  };
}
