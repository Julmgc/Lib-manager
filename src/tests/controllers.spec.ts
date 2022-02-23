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
      isAdm: true,
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
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("isAdm");
    expect(response.body).toHaveProperty("cpf");
    expect(response.body.name).toBe("Natalia Cristine De Almeida Nunes");
    expect(response.body.password).not.toBe("123");

    userId = response.body.id;
  });

  it("Should to login with the created user", async () => {
    const userLoginData = {
      email: "natiunirio@hotmail.com",
      password: "1234",
    };

    const response = await request(app).post("/user/login").send(userLoginData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");

    expect(response.body.password).not.toBe("1234");
    token = response.body.token;
  });

  it("Should be able to get the users profiles informations", async () => {
    const response = await request(app)
      .get(`/user`)
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: userId })])
    );
  });

  it("Should be able to get the user profile informations", async () => {
    const response = await request(app)
      .get(`/user/${userId}`)
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("isAdm");
    expect(response.body).toHaveProperty("cpf");
    expect(response.body.name).toBe("Natalia Cristine De Almeida Nunes");
  });

  it("Should changing user information", async () => {
    const updateUser = {
      address: { city: "Piraquara" },
    };
    const response = await request(app)
      .patch(`/user`)
      .send(updateUser)
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("isAdm");
    expect(response.body).toHaveProperty("cpf");
    expect(response.body).toHaveProperty("address");
    expect(response.body.address.city).toBe("Piraquara");
  });
});
