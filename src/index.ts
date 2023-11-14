import http from "http";
import path from "path";
import dotenv from "dotenv";
import { main } from "./Servers/main";
import { mail } from "./Servers/mail";

dotenv.config({
  path: path.resolve(__dirname, "..", ".env"),
});

import "./config";
import "./database";
const startServer = () => {
  const httpServerMain = http.createServer(main);
  httpServerMain.listen("3000", async () => {
    console.log(`Main server is working on http://localhost:3000`);
  });
  const httpServerSecond = http.createServer(mail);
  httpServerSecond.listen("3001", async () => {
    console.log(`Background server is working on http://localhost:3001`);
  });
};

startServer();
