import emailRepository from "../repositories/emailCodeRepository";
import { getCustomRepository } from "typeorm";
import { UserServices } from "./userServices";

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
        const codeEmail = await emailRepo.create({
          user: user,
        });

        await emailRepo.save(codeEmail);
        return codeEmail;
      } else {
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
}
