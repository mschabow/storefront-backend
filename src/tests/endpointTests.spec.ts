import supertest from "supertest";
import app from "../server";
import dotenv from "dotenv";
dotenv.config();

const request = supertest(app);
let token: string;

describe("Test endpoint responses", () => {
  it("POST /v1/users/register without user fails with 400", async () => {
    const response = await request.post("/v1/users/register");
    expect(response.status).toBe(400);
  });

  it("POST /v1/users/register with valid user passes", async () => {
    const response = await request.post("/v1/users/register").send({
      firstname: "Test",
      lastname: "User",
      password: process.env.TEST_PASSWORD,
    });
    expect(response.status).toBe(200);
    token = response.body;
    console.log(`TOKEN: ${token}`)
  });

  it("POST /v1/users/login with valid user passes", async () => {
    const response = await request.post("/v1/users/login").send({
      firstname: "Test",
      lastname: "User",
      password: process.env.TEST_PASSWORD,
    });
    expect(response.status).toBe(200);
  });

  it("POST /v1/users/login with invalid user fails with 401", async () => {
    const response = await request.post("/v1/users/login").send({
      firstname: "Test",
      lastname: "User",
      password: "wrongPassword",
    });
    expect(response.status).toBe(401);
  });

  it("GET /v1/users/ passes", async () => {
    const response = await request
      .get("/v1/users/")
      .set("Authorization", "bearer " + token)
      .send();

    expect(response.status).toBe(200);
  });

  it("GET /v1/users/1 passes", async () => {
    const response = await request
      .get("/v1/users/1")
      .set("Authorization", "bearer " + token)
      .send();

    expect(response.status).toBe(200);
  });

  it("GET /v1/products/ passes", async () => {
    const response = await request.get("/v1/products/");
    expect(response.status).toBe(200);
  });

  it("GET /v1/products/1 passes", async () => {
    const response = await request.get("/v1/products/1").send();
    expect(response.status).toBe(200);
  });

  it("POST /v1/products/ passes", async () => {
    const response = await request
      .post("/v1/products/")
      .set("Authorization", "bearer " + token)
      .send({ name: "testProduct", price: "20.99", category: "misc" });

    expect(response.status).toBe(200);
  });

  it("GET /v1/orders/ passes", async () => {
    const response = await request
      .get("/v1/orders/")
      .set("Authorization", "bearer " + token)
      .send();
    expect(response.status).toBe(200);
  });

  it("GET /v1/orders/user/1 passes", async () => {
    const response = await request
      .get("/v1/orders/user/1")
      .set("Authorization", "bearer " + token)
      .send();
    expect(response.status).toBe(200);
  });
});
