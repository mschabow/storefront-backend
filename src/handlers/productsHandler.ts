import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { ProductStore } from "../models/product";
import { jwtVerify } from "../middleware/jwtMiddleware";

dotenv.config();

const store = new ProductStore();

export const productRoutes = express.Router();
productRoutes.get("/", async (req: Request, res: Response) => {
  await index(req, res);
});
productRoutes.get("/:id", async (req: Request, res: Response) => {
  await show(req, res);
});

productRoutes.post("/", jwtVerify, async (req: Request, res: Response) => {
  await create(req, res);
});

async function index(req: Request, res: Response) {
  try {
    const products = await store.index();
    res.json(products);
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
}

async function show(req: Request, res: Response) {
  try {
    const id = +req.params.id;
    const products = await store.show(id);
    res.json(products);
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
}

async function create(req: Request, res: Response) {
  try {
    const name = req.body.name;
    const price = req.body.price;
    const category = req.body.category;
    const product = await store.create(name, price, category);
    res.json(product);
  } catch (error) {
    res.status(400);
    res.json({error});
  }
}

// TODO: [OPTIONAL] Top 5 most popular products v1/products/most-popular/ [GET]
// TODO: [OPTIONAL] Products by category (args: product category) v1/products/:category [GET]
