import { User, UserStore } from "./../models/user";

import dotenv from "dotenv";
dotenv.config();

const store = new UserStore();

describe("User Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });
  it("index method should return a list of users", async () => {
    const result = await store.index();
    expect(result.length).toEqual(2);
  });
  it("show method should return a user", async () => {
    const result = await store.show(1);
    expect(result).toBeDefined();
  });
  it("create method should return a user", async () => {
    const result: User = await store.create({
      firstname: "John",
      lastname: "Doe",
      password: process.env.TEST_PASSWORD!,
    });
    const hashedPassword = result.password;

    const createdUser: User = {
      id: 4,
      firstname: "John",
      lastname: "Doe",
      password: hashedPassword,
    };
    expect(result).toEqual(createdUser);
  });
  it("authenticate method should return a user", async () => {
    const result = await store.authenticate(
      "John",
      "Doe",
      process.env.TEST_PASSWORD!
    );
    expect(result?.firstname).toBeDefined();
  });
  it("authenticate method with wrong password should not return a user", async () => {
    await expectAsync(store.authenticate("John", "Doe", "wrongPassword")).toBeRejected();
  });
});
