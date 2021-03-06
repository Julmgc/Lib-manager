import { getCustomRepository } from "typeorm";
import GenreRepository from "../repositories/genreRepository";
import { ApiError } from "../utils/errors";
import ddc from "../utils/ddcCodes";

export class GenreServices {
  static genreRepository = () => {
    return getCustomRepository(GenreRepository);
  };
  static insertBaseCodes = async () => {
    const dataInTable = await this.genreRepository().findOne({
      ddc: "000",
    });

    if (dataInTable !== undefined) {
      return;
    }

    this.genreRepository().createQueryBuilder().insert().values(ddc).execute();
  };

  static getAll = async (page: number = 1, per_page: number = 999) => {
    if (page) {
      const codes = await this.genreRepository()
        .createQueryBuilder()
        .skip(per_page * (page - 1))
        .take(per_page)
        .getMany();
      return codes;
    }
    const codes = await this.genreRepository().find();

    return codes;
  };

  static getByCode = async (code: string) => {
    const genre = await this.genreRepository().findOne({ ddc: code });

    if (!genre) {
      throw new ApiError("DDC not found!", 404);
    }

    return genre;
  };
}
