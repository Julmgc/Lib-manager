import { EntityRepository, Repository } from "typeorm";
import Book from "../entities/bookEntity";

@EntityRepository(Book)
export default class BookRepository extends Repository<Book> {}
