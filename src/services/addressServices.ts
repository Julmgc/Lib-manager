import { getCustomRepository } from "typeorm"
import AddressRepository from "../repositories/addressRepository"

export class AddressServices {
    static addressRepository = () => {
        return getCustomRepository(AddressRepository);
    }
}