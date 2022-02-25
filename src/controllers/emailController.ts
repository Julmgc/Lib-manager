import { NextFunction, Request, Response } from "express";
import { RetrieveServices } from "../services/retrieveServices";
import MailerServices from "../services/mailerService";
import { ApiError } from "../utils/errors";
import { UserServices } from "../services/userServices";

export class EmailController {
  static postEmailRetrieve = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const email = req.body.email;
      const codeEmail = await RetrieveServices.searchCode(email);
      if (codeEmail) {
        const emailOptions = {
          from: process.env.MAILER_USER,
          to: email,
          subject: "Código recuperação",
          template: "retrieve",
          context: {
            code: codeEmail.code,
          },
        };

        const transport = MailerServices.transport();
        transport.sendMail(emailOptions);
        return res.status(200).json({ message: "E-mail sent" });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  static sendEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, message } = req.body;
      const user = await UserServices.getByEmail(email);
      if (!user) {
        throw new ApiError("User not found", 404);
      }
      const emailOptions = {
        from: process.env.MAILER_USER,
        to: email,
        subject: "LibManager Contact",
        html: `<p>${message}</p>`,
      };

      const transport = MailerServices.transport();
      transport.sendMail(emailOptions);
      return res.status(200).json({ message: "E-mail sent" });
    } catch (err) {
      next(err);
    }
  };

  static changePasswordRoute = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = req.validatedFields;
      const code = await RetrieveServices.getCode(data.email);
      if (!code) {
        return new ApiError("Invalid Email", 422);
      }
      if (data.code != code.code) {
        return new ApiError("Invalid Code", 422);
      }
      await UserServices.updatePassword(data.newPassword, data.email);
      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  };
}
