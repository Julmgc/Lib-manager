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
<<<<<<< HEAD
    const user = UserServices.findById(userId);
    const fines = await repository.find({ where: { user: user } });
=======
    const user = UserServices.findById(userId)
    const fines = await repository.find({where: {user: user}});
>>>>>>> ffd5c91d37d739dad29295d7a3fffb54cfb99474
    return fines;
  };

  static payFine = async (fineId: string) => {
    const repository = this.fineRepository();
<<<<<<< HEAD
    await repository.delete(fineId);
    return;
  };
=======
    await repository.delete(fineId)
    return;
  }
>>>>>>> ffd5c91d37d739dad29295d7a3fffb54cfb99474
}
