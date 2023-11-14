import "express-async-errors";
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";

export const main = express();
dotenv.config({
  path: path.resolve(__dirname, "..", "..", ".env"),
});

main.use(express.json());

main.use(express.urlencoded({ extended: true }));

import routes from "../router";

main.use(routes);

main.get("/", (req: Request, res: Response) => {
  res.status(403).send("Forbidden");
});

main.on("error", (error) => {
  console.error(`<::: An error occurred on the server: \n ${error}`);
});
