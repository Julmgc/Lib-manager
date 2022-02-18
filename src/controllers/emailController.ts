import { NextFunction, Request, Response } from "express";
import { RetrieveServices } from "../services/retrieveServices";
import MailerServices from "../services/mailerService";

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
          template: "retrieve",
          context: {
            code: codeEmail.code,
          },
        };

        const transport = MailerServices.transport();
        transport.sendMail(emailOptions);
        return res.status(200).json({ message: "Send email" });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}
