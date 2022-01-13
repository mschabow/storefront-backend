# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index v1/products/ [GET]
- Show v1/products/:id [GET]
- Create [token required] v1/products/ [POST]
- [OPTIONAL] Top 5 most popular products v1/products/most-popular/ [GET]
- [OPTIONAL] Products by category (args: product category) v1/products/:category [GET]

#### Users

- Index [token required] /v1/users/ [GET]
- Show [token required] /v1/users/:id [GET]
- Create N[token required] /v1/users/register [POST]

#### Orders

- Current Order by user (args: user id)[token required] /v1/orders/:userId
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

CREATE TABLE products(
id SERIAL PRIMARY KEY,
name VARCHAR(64) NOT NULL,
price integer NOT NULL
)

create TABLE categories(
id SERIAL PRIMARY KEY,
name VARCHAR(64) NOT NULL
)

CREATE TABLE product_category(
id SERIAL PRIMARY,
productID bigint REFERENCES products(id),
category_id bigint REFERENCES categories(id)
)

#### User

- id
- firstname
- lastname
- password

CREATE TABLE users(
id SERIAL PRIMARY KEY,
firstname VARCHAR(64) NOT NULL,
lastname VARCHAR(64) NOT NULL,
password VARCHAR
)

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- userID
- status of order (active or complete)

CREATE TABLE orders (
id SERIAL PRIMARY KEY,
status VARCHAR(15),
userID bigint REFERENCES users(id)
);

CREATE TABLE order_products (
id SERIAL PRIMARY KEY,
quantity integer,
orderID bigint REFERENCES orders(id),
productID bigint REFERENCES products(id)
);
