import client from "../dbClient";

enum OrderStatus {
  ACTIVE = "active",
  COMPLETE = "complete",
  UNKNOWN = "unknown",
}

export type Order = {
  id: Number;
  productIds: Number[];
  productQuantities: Number[];
  userID: Number;
  status: OrderStatus;
};

export class OrderStore {
  // TODO: Current Order By User

  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM orders";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get orders: ${error}`);
    }
  }
  async showOrderByUser(userId: number): Promise<Order> {
    try {
      const order: Order = {
        id: 0,
        productIds: [],
        productQuantities: [],
        userID: userId,
        status: OrderStatus.ACTIVE,
      };
      const conn = await client.connect();

      let sql =
        "SELECT * FROM orders WHERE userID=($1) AND orderStatus='active'";
      const orderResult = await conn.query(sql, [userId]);
      order.id = orderResult.rows[0].id;
      order.status = orderResult.rows[0].orderStatus;

      sql = "SELECT * FROM order_products WHERE orderID = ($1)";
      const orderProductResult = await conn.query(sql, [order.id]);

      conn.release();

      orderProductResult.rows.forEach((product) => {
        order.productIds.push(+product.productID);
        order.productQuantities.push(product.quantity);
      });

      return order;
    } catch (error) {
      throw new Error(
        `Cannot get current order for (UserID ${userId}): ${error}`
      );
    }
  }

  // TODO: (Optionl) Completed orders by user
}
