import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import v1Routes from "./routes/v1Routes";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(bodyParser.json());

app.use(cors());

app.use("/v1", v1Routes);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
