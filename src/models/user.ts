import client from "../dbClient";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const pepper = process.env.BCRYPT_PASSWORD || "";
const saltRounds = process.env.SALT_ROUNDS || "";

export type User = {
  id?: Number;
  firstname: string;
  lastname: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get users: ${error}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot get user (UserID ${id}): ${error}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql =
        "INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *";
      const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));
      const result = await conn.query(sql, [u.firstname, u.lastname, hash]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `unable create user (${u.firstname} ${u.lastname}): ${err}`
      );
    }
  }

  async authenticate(
    firstname: string,
    lastname: string,
    password: string
  ): Promise<User> {
    let user;
    try {
      const conn = await client.connect();
      
      const sql =
        "SELECT * FROM users WHERE firstname=($1) AND lastname=($2)";

      const result = await conn.query(sql, [firstname, lastname]);      
      conn.release();

      if (result.rows.length) {
        const testUser = result.rows[0];

        if (bcrypt.compareSync(password + pepper, testUser.password)) {
          user = testUser;
        }
        else{
          throw new Error();
        }
      }  
    } catch (error) {
      throw new Error(
        `unable to authenticate user (${firstname}, ${lastname}): ${error}`
      );
    }
    return user;
  }
}
