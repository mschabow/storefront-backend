import { orderRoutes } from './../handlers/ordersHandler';
import { productRoutes } from './../handlers/productsHandler';
import express from "express";
import {userRoutes} from "../handlers/usersHandler";

const v1Routes = express.Router();

v1Routes.get("/", (req, res) => {
  res.send("Hello World!!");
});

v1Routes.use("/users", userRoutes);
v1Routes.use("/products", productRoutes)
v1Routes.use("/orders", orderRoutes);

export default v1Routes;
