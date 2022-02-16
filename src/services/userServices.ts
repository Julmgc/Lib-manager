import { getCustomRepository } from "typeorm";
import UserRepository from "../repositories/userRepository";
import { userInterface } from "../types";
import User from "../entities/userEntity";

export class UserServices {
  static userRepository = () => {
    return getCustomRepository(UserRepository);
  };

  static remove = async (id: string) => {
    await this.userRepository().delete({ id });

    return;
  };

  static async createUser(userData: userInterface): Promise<User> {
    const userRepo = this.userRepository();

    const user = userRepo.create({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      authorized: userData.authorized,
      isAdm: userData.isAdm,
      address: userData.address,
      cpf: userData.cpf,
    });
    await userRepo.save(user);
    return user;
  }

  static getAllUser = async () => {
    const repository = this.userRepository();
    const users = await repository.find();

    return users;
  };
}
