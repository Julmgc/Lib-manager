import { EntityRepository, Repository } from "typeorm";
import EmailCode from "../entities/emailCodeEntity";

@EntityRepository(EmailCode)
export default class emailRepository extends Repository<EmailCode> {}
