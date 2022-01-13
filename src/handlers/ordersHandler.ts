import { OrderStore } from "./../models/order";
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { jwtVerify } from "../middleware/jwtMiddleware";

dotenv.config();

const store = new OrderStore();

export const orderRoutes = express.Router();

orderRoutes.get("/", jwtVerify, async (req: Request, res: Response) => {
  await index(req, res);
});

orderRoutes.get("/user/:id", jwtVerify, async (req: Request, res: Response) => {
  await showOrderByUser(req, res);
});

async function index(req: Request, res: Response) {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
}

async function showOrderByUser(req: Request, res: Response) {
  try {
    const id = +req.params.id;
    const orders = await store.showOrderByUser(id);
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(`${error}`);
  }
}
