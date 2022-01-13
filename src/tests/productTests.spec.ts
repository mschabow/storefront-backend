import { ProductStore } from "../models/product";

const store = new ProductStore();

describe("Order Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });
  it("index method should return a list of products", async () => {
    const result = await store.index();
    expect(result.length).toEqual(4);
  });
  it("show method should return an product", async () => {
    const result = await store.show(1);
    expect(result).toBeDefined();
  });
});
