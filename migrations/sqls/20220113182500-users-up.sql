CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(64) NOT NULL,
    lastname VARCHAR(64) NOT NULL,
    password VARCHAR
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