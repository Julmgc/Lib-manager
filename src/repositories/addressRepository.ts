import { EntityRepository, Repository } from "typeorm";
import Address from "../entities/addressEntity";

@EntityRepository(Address)
export default class AddressRepository extends Repository<Address> {}
