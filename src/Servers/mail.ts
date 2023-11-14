import "express-async-errors";
import cron from "node-cron";
import express, { Request, Response } from "express";
import MailService from "../service/mail.service";
import dotenv from "dotenv";
import path from "path";
import User from "../model/user.model";

export const mail = express();

mail.use(express.json());

mail.use(express.urlencoded({ extended: true }));

dotenv.config({
  path: path.resolve(__dirname, "..", "..", ".env"),
});

mail.get("/", (req: Request, res: Response) => {
  res.status(403).send("Forbidden");
});

const sendPeriodicMail = async () => {
  const user = await User.find({ isVerified: true });
  if (!user.length) return;
  for (let i = 0; i < user.length; i++) {
    console.log("sending");
    await new MailService().sendPeriodicMail(user[i].email);
  }
  return;
};

cron.schedule("* * * * *", async () => {
  await sendPeriodicMail();
});

mail.on("error", (error) => {
  console.error(`<::: An error occurred on the server: \n ${error}`);
});
