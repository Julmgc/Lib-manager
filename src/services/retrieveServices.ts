import emailRepository from "../repositories/emailCodeRepository";
import { getCustomRepository } from "typeorm";
import { UserServices } from "./userServices";
import EmailCode from "../entities/emailCodeEntity";

export const genCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

export class RetrieveServices {
  static emailRepository = () => {
    return getCustomRepository(emailRepository);
  };

  static searchCode = async (email: string) => {
    const emailRepo = this.emailRepository();
    const user = await UserServices.getByEmail(email);
    const emailCode = await emailRepo.findOne({
      where: {
        user: user,
      },
    });
    if (user) {
      if (!emailCode) {
        const codeEmail = emailRepo.create({
          code: genCode(),
          user: user,
        });

        await emailRepo.save(codeEmail);
        return codeEmail;
      } else {
        emailCode.code = genCode();
        await emailRepo.save(emailCode);
        const codeEmailNew = emailRepo.findOne({
          where: {
            user: user,
          },
        });
        return codeEmailNew;
      }
    }
  };
  static getCode = async (email: string): Promise<EmailCode | undefined> => {
    const codeRepo = this.emailRepository();
    const user = await UserServices.getByEmail(email);
    const code = codeRepo.findOne({
      where: {
        user: user,
      },
    });
    return code;
  };
}
