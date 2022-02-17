import { getCustomRepository } from "typeorm";
import UserRepository from "../repositories/userRepository";
import AddressRepository from "../repositories/addressRepository";
import { loginInterface, userInterface } from "../types";
import User from "../entities/userEntity";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const jwtConfig = {
  secret: <string>process.env.JWT_SECRET_KEY,
  expiresIn: "24h",
};

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

  static getByEmail = async (email: string) => {
    const repository = this.userRepository();
    const user = await repository.findOne({ email });

    return user;
  };

  static findById = async (id: string) => {
    const repository = this.userRepository();
    const user = await repository.findOne({ id });

    return user;
  };

  static login = async ({ email, password, isAdm }: loginInterface) => {
    const repository = this.userRepository();
    const user = await repository.findOne({ email });

    if (user !== undefined) {
      const match = await bcrypt.compare(password, user.password);
      const { password: user_password, ...userData } = user;
      let token = jwt.sign(
        {
          userData,
        },
        jwtConfig.secret,
        {
          expiresIn: jwtConfig.expiresIn,
        }
      );
      if (match) {
        return { token: token };
      } else {
        throw new Error("Wrong email/password");
      }
    } else {
      throw new Error("Wrong email/password");
    }
  };

  static async updateUser(data: any, userId: any) {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne({ id: userId });

    if (!user) {
      return "User not found";
    }

    if (data.address) {
      const addressRepository = getCustomRepository(AddressRepository);
      const address = await addressRepository.findOne({ id: user?.address.id });
      if (!address) {
        return "Users address not found";
      }
      await addressRepository.update(address?.id, data.address);
    }

    if (data.name) {
      const userData = { name: data.name };
      await userRepository.update(userId, userData);
    }
    if (data.email) {
      const userData = { email: data.email };
      await userRepository.update(userId, userData);
    }

    return await userRepository.findOne({ id: userId });
  }
}
