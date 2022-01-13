CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    orderStatus VARCHAR(15),
    userID bigint REFERENCES users(id)
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