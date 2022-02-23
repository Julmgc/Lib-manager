import request from "supertest";

import { createConnection, getConnection } from "typeorm";

import app from "../app";

describe("Controller Tests for Admin", () => {
  beforeAll(async () => {
    await createConnection();
  });

  afterAll(async () => {
    const conection = getConnection();

    await conection.close();
  });

  let token = "";
  let userId = "";
  let bookId = "";
  let reviewId = "";

  it("Should create a new user", async () => {
    const userData = {
      name: "natalia cristine de almeida nunes",
      email: "natiunirio@hotmail.com",
      password: "1234",
      isAdmin: true,
      cpf: "12283723736",
      birthDate: "1989-11-29",
      address: {
        street: "rua um",
        streetNumber: "2",
        city: "cidadezinha",
        state: "RS",
        zipcode: "13548-796",
        district: "bairro",
      },
    };
    const response = await request(app).post("/user").send(userData);

    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("isAdm");
    expect(response.body).toHaveProperty("cpf");
    expect(response.body.name).toBe("Natalia Cristine De Almeida Nunes");
    expect(response.body.password).not.toBe("123");
  });
});
