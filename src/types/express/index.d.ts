import { jwtUserDataInterface, userInterface } from "..";

declare global {
  namespace Express {
    export interface Request {
      validatedFields: userInterface;
      userDataByToken: jwtUserDataInterface;
    }
  }
}
