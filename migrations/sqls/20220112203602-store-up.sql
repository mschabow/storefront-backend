CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    price DECIMAL(8,2) NOT NULL,
    category VARCHAR(64)
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(64) NOT NULL,
    lastname VARCHAR(64) NOT NULL,
    password VARCHAR
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    orderStatus VARCHAR(15),
    userID bigint REFERENCES users(id)
);

CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    orderID bigint REFERENCES orders(id),
    productID bigint REFERENCES products(id)
);

INSERT INTO users(
    firstname,
    lastname,
    password
)
VALUES (
    'Matt',
    'Schabowsky',
    '$2b$10$LHBA7NMG4og3J9u9lmOez.stMFqSXdcHaYs88wZwwi3awPLdaNyi2'
);

INSERT INTO orders (
    orderStatus,
    userID
) VALUES (
    'complete',
    1
);

INSERT INTO orders (
    orderStatus,
    userID
) 
VALUES (
    'active',
    1
);

INSERT INTO products (
    name,
    price,
    category
)
VALUES(
    'alto saxophone',
    3200.00,
    'woodwind:saxophone'
);

INSERT INTO products (
    name,
    price,
    category
)
VALUES(
    'tenor saxophone',
    4200.00,
    'woodwind:saxophone'
);

INSERT INTO products (
    name,
    price,
    category
)
VALUES(
    'flute',
    3500.00,
    'woodwind:flute'
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
