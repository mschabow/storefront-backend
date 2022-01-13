import { Order, OrderStore } from "./../models/order";

const store = new OrderStore();

describe("Order Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });
  it("index method should return a list of orders", async () => {
    const result = await store.index();
    expect(result.length).toEqual(2);
  });
  it("showorderbyuser method should return an order", async () => {
    const result = await store.showOrderByUser(1);
    expect(result).toBeDefined();
  });
});
