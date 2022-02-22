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
});
