export interface addressInterface {
  street: string;
  streetNumber: string;
  city: string;
  state: string;
  zipcode: string;
  district: string;
  id?: string;
}

export interface userInterface {
  id?: string;
  name: string;
  email: string;
  password: string;
  loanedBooks: number;
  authorized: boolean;
  isAdm: boolean;
  address: addressInterface;
  cpf: string;
  birthDate: string;
}

export interface bookInterface {
  name: string;
  author: string;
  pages: number;
  genreCdd: number;
  published_year: number;
}
export interface loginInterface {
  email: string;
  password: string;
  isAdm: boolean;
}

export interface jwtUserDataInterface {
  id: string;
  name: string;
  email: string;
  authorized: boolean;
  isAdm: boolean;
  cpf: string;
}

export interface getAllBooksQuerys {
  page?: number;
  per_page?: number;
  author?: string;
  ddc?: string;
  category?: string;
}

export interface review {
  rating: number;
  reviewContent: string;
}
