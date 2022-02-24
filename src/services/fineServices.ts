import { getCustomRepository } from "typeorm";
import FineRepository from "../repositories/fineRepository";

export class FineServices {
  static fineRepository = () => {
    return getCustomRepository(FineRepository);
  };
  static getAll = async () => {
    const repository = this.fineRepository();
    const fines = await repository.find();

    return fines;
  };
  static findById = async (userId: string) => {
    const repository = this.fineRepository();
    const fines = await repository.find({ where: { id: userId } });

    return fines;
  };
}
