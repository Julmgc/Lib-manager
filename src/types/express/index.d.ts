import { jwtUserDataInterface, userInterface } from "..";

declare global {
  namespace Express {
    export interface Request {
      validatedFields: any;
      userDataByToken: jwtUserDataInterface;
    }
  }
}
