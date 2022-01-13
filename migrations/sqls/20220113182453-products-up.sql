CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    price DECIMAL(8,2) NOT NULL,
    category VARCHAR(64)
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


