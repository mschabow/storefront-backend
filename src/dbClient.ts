import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const {
  DB_HOST,
  DB_DEV,
  DB_TEST,
  DB_USER,
  DB_PASSWORD,
  NODE_ENV,
} = process.env;

const client = new Pool({
  host: DB_HOST,
  database: NODE_ENV === "dev" ? DB_DEV : DB_TEST,
  user: DB_USER,
  password: DB_PASSWORD,
});


export default client;
