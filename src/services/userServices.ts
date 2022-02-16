import { getCustomRepository } from "typeorm";
import UserRepository from "../repositories/userRepository";

export class UserServices {
  static userRepository = () => {
    return getCustomRepository(UserRepository);
  };

  static getAllUser = async () => {
    const repository = this.userRepository();
    const users = await repository.find();

    return users;
  };
}
