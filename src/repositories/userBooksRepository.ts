import { EntityRepository, Repository } from "typeorm";
import UserBooks from "../entities/userBooksEntity";

@EntityRepository(UserBooks)
export default class UserBooksRepository extends Repository<UserBooks> {}
