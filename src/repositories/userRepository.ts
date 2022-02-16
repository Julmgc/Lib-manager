import { EntityRepository, Repository } from "typeorm";
import User from "../entities/userEntity";

@EntityRepository(User)
export default class UserRepository extends Repository<User> {}
