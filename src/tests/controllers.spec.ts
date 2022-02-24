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

    expect(response.body).toHaveProperty("authorized");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("isAdm");
    expect(response.body).toHaveProperty("cpf");
    expect(response.body.authorized).toBe(true);
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

  it("Should create a new book", async () => {
    const BookData = {
      name: "Harry Potter 4",
      author: "J.K. Rowling",
      genreCdd: 813,
      pages: 342,
      published_year: 385,
    };
    const response = await request(app)
      .post("/book/")
      .send(BookData)
      .set({ Authorization: `Bearer ${token}` })
      .expect(201);

    bookId = response.body.book.id;

    expect(response.body).toHaveProperty("admin");
    expect(response.body).toHaveProperty("book");
    expect(response.body.book.name).toBe("Harry Potter 4");
    expect(response.body.genreCdd).not.toBe("123");
    expect(response.body.book.loaned).toBe(false);
  });

  it("Should loan a book", async () => {
    const UserData = {
      userEmail: "natiunirio@hotmail.com",
    };
    const response = await request(app)
      .post(`/book/loan/${bookId}`)
      .send(UserData)
      .set({ Authorization: `Bearer ${token}` })
      .expect(201);

    expect(response.body).toHaveProperty("checkout_date");
    expect(response.body).toHaveProperty("return_date");
    expect(response.body).toHaveProperty("id");
    expect(response.body.renewed).toBe(false);
    expect(response.body.returned).not.toBe(true);
  });

  it("Should return a book", async () => {
    const response = await request(app)
      .post(`/book/return/${bookId}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(200);

    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("loaned");
    expect(response.body).toHaveProperty("genre");
    expect(response.body).toHaveProperty("pages");
    expect(response.body.name).toBe("Harry Potter 4");
    expect(response.body.genre).not.toBe("123");
    expect(response.body.loaned).toBe(false);
  });

  it("Should loan a book", async () => {
    const UserData = {
      userEmail: "natiunirio@hotmail.com",
    };
    const response = await request(app)
      .post(`/book/loan/${bookId}`)
      .send(UserData)
      .set({ Authorization: `Bearer ${token}` })
      .expect(201);

    expect(response.body).toHaveProperty("checkout_date");
    expect(response.body).toHaveProperty("return_date");
    expect(response.body).toHaveProperty("id");
    expect(response.body.renewed).toBe(false);
    expect(response.body.returned).not.toBe(true);
  });

  it("Should show all books", async () => {
    const response = await request(app).get("/book/").expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: bookId })])
    );
  });

  it("Should show a specific book", async () => {
    const response = await request(app).get(`/book/${bookId}`).expect(200);

    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("loaned");
    expect(response.body).toHaveProperty("pages");
    expect(response.body.name).toBe("Harry Potter 4");
  });

  it("Should return the users borrowed books", async () => {
    const response = await request(app)
      .get(`/book/loan/${userId}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining([expect.objectContaining({ bookId: bookId })])
    );
  });

  it("Should return all the books that are loaned", async () => {
    const response = await request(app)
      .get("/book/loan")
      .set({ Authorization: `Bearer ${token}` })
      .expect(200);

    expect(response.body[0].bookId).toEqual(bookId);
  });

  it("Should Create a Review", async () => {
    const reviewData = {
      rating: 2,
      reviewContent: "Livro muito bom, pena que é ruim",
    };
    const response = await request(app)
      .post(`/reviews/book/${bookId}`)
      .send(reviewData)
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(201);

    expect(response.body.review).toHaveProperty("rating");
    expect(response.body.review).toHaveProperty("reviewContent");
    expect(response.body.review).toHaveProperty("id");
    expect(response.body.review).toHaveProperty("createdOn");
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("book");

    expect(response.body.review.reviewContent).toBe(reviewData.reviewContent);
    expect(response.body.review.rating).toBe(reviewData.rating);

    reviewId = response.body.review.id;
  });

  it("Should get all the book reviews", async () => {
    const response = await request(app)
      .get(`/reviews/book/${bookId}`)
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });
  it("Should get all the reviews", async () => {
    const response = await request(app)
      .get("/reviews")
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });
  it("Should get all the user reviews", async () => {
    const response = await request(app)
      .get(`/reviews/user/${userId}`)
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it("Should update a review", async () => {
    const updateData = {
      rating: 4,
    };

    const response = await request(app)
      .patch(`/reviews/${reviewId}`)
      .send(updateData)
      .set({ Authorization: `Bearer ${token}` });
    expect(response.status).toBe(202);
    expect(response.body.review).toHaveProperty("rating");
    expect(response.body.review.rating).toBe(4);
  });

  it("Should delete a review", async () => {
    const response = await request(app)
      .delete(`/reviews/${reviewId}`)
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(204);
  });
});
