import { getCustomRepository } from "typeorm";
import Address from "../entities/addressEntity";
import AddressRepository from "../repositories/addressRepository";
import { addressInterface } from "../types";

export class AddressServices {
  static addressRepository = () => {
    return getCustomRepository(AddressRepository);
  };

  public static async createAdress(
    addressData: addressInterface
  ): Promise<Address> {
    const addressRepo = this.addressRepository();
    const address = addressRepo.create({
      city: addressData.city,
      street: addressData.street,
      streetNumber: addressData.streetNumber,
      state: addressData.state,
      zipcode: addressData.zipcode,
      district: addressData.district,
    });
    await addressRepo.save(address);
    return address;
  }
}
