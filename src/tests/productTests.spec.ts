import { Product, ProductStore } from "../models/product";

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
  it("create method should return a product", async () => {
    const result = await store.create("productName", 3.50, "misc")

    const createdProduct: Product = {
      id: 5,
      name: "productName",
      price: "3.50",
      category: "misc"
    };
    expect(result).toEqual(createdProduct);
  });
});
