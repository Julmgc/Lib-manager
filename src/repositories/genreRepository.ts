import { EntityRepository, Repository } from "typeorm";
import { Genre } from "../entities/genreEntity";

@EntityRepository(Genre)
export default class GenreRepository extends Repository<Genre> {}
