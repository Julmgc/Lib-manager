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
    try{
      const { email, message } = req.body;
      const emailOptions = {
        from: process.env.MAILER_USER,
        to: email,
        template: "retrieve",
        context: {
          message: message
        },
      };
      
      const transport = MailerServices.transport();
      transport.sendMail(emailOptions);
      return res.status(200).json({ message: "E-mail sent" });
    } catch (err) {
      next(err);
    }
  };

}
