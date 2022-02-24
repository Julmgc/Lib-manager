import { getCustomRepository } from "typeorm";
import FineRepository from "../repositories/fineRepository";
import { UserServices } from "./userServices";

export class FineServices {
  static fineRepository = () => {
    return getCustomRepository(FineRepository);
  };
  static getAll = async () => {
    const repository = this.fineRepository();
    const fines = await repository.find();

    return fines;
  };

  static getUserFines = async (userId: string) => {
    const repository = this.fineRepository();
    const user = UserServices.findById(userId)
    const fines = await repository.find({where: {user: user}});
    return fines;
  };

  static payFine = async (fineId: string) => {
    const repository = this.fineRepository();
    await repository.delete(fineId)
    return;
  }
}
