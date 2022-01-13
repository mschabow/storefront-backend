CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    orderID bigint REFERENCES orders(id),
    productID bigint REFERENCES products(id)
);

INSERT INTO order_products(
    quantity,
    orderID,
    productID
)
VALUES (
    2,
    2,
    1
);

INSERT INTO order_products(
    quantity,
    orderID,
    productID
)
VALUES (
    1,
    2,
    2
);