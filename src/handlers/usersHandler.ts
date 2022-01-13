import express from "express";
import { Request, Response } from "express";
import dotenv from "dotenv";
import { User, UserStore } from "../models/user";
import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtVerify } from "../middleware/jwtMiddleware";

dotenv.config();

const store = new UserStore();

export const userRoutes = express.Router();
userRoutes.post("/login", async (req, res) => {
  await authenticate(req, res);
});
userRoutes.post("/register", async (req, res) => {
  await create(req, res);
});
userRoutes.get("/", jwtVerify, async (req, res) => {
  await index(req, res);
});
userRoutes.get("/:id", jwtVerify, async (req, res) => {
  await show(req, res);
});

export const create = async (req: Request, res: Response) => {
  const user: User = {
    id: 0,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
  };
  try {
    const newUser = await store.create(user);
    const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET!);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json({ err });
  }
};

export const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    id: 0,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
  };
  try {
    const u = await store.authenticate(
      user.firstname,
      user.lastname,
      user.password
    );
    if (u === null) {
      throw "Invalid user or password";
    }
    const token = jwt.sign({ user: u }, process.env.TOKEN_SECRET!);
    res.json(token);
  } catch (error) {
    res.status(401);
    res.json(error);
  }
};

export const index = async (req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const id = +req.params.id;
    const user = await store.show(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404);
      res.json(`(UserID: ${id}) Not Found`);
    }
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
};
