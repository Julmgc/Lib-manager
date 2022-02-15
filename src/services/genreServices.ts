import { getCustomRepository } from "typeorm";
import GenreRepository from "../repositories/genreRepository";
import fs from 'fs';


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

		// const data = fs.read("../utils/ddcCodes.json", 'utf8', () => {

		// });
		// this.repo().createQueryBuilder().insert().values(JSON.parse(data)).execute();
		// for (let item of data) {
				// 		continue;
		// 	}
		// 	const partial = {ddc: item.ddc, description: item.description}
		//     const treco = this.repo().create(partial)
		// 	await this.repo().save(treco)
		// }
	};
}
