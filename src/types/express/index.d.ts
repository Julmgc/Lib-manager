import { userInterface } from "..";

declare global {
  namespace Express {
    export interface Request {
      validatedFields: any;
      userDataByToken: userInterface;
    }
  }
}
