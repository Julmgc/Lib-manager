import { getCustomRepository } from "typeorm";
import GenreRepository from "../repositories/genreRepository";
import fs from 'fs';
import ddcCodes from '../utils/ddcCodes.json';
import path from 'path';


export class DDCdata {
	static repo = () => {
		return getCustomRepository(GenreRepository);
	};
	static insert = async () => {
		const dataInTable = await this.repo().findOne({ ddc: "000" });
		
		if (dataInTable !== undefined) {
		    console.log('skipped')
		    return;
		}

		fs.readFile(path.resolve(__dirname, "..", "utils/ddcCodes.json"), "utf8", (err, data) => {
			this.repo().createQueryBuilder().insert().values(JSON.parse(data)).execute();
		});

	};
}
