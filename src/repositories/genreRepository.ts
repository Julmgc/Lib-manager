import { EntityRepository, Repository } from "typeorm";
import { GenreEntity } from "../entities/genreEntity";

@EntityRepository(GenreEntity)
export default class GenreRepository extends Repository<GenreEntity> {}