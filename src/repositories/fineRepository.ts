import { EntityRepository, Repository } from "typeorm";
import Fine from "../entities/fineEntity";

@EntityRepository(Fine)
export default class FineRepository extends Repository<Fine> {}
