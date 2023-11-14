import mongoose from "mongoose";

import { MONGO_URL } from "../config";

mongoose
  .connect(MONGO_URL as string)
  .then(() => {
    console.log(`:::>  Database connected`);
  })
  .catch((err) => {
    console.error(err);
  });
