import { Router } from "express";
import type { Request, Response } from "express";
import authRoute from "./auth.route";

const router = Router();

router.use("/api/v1/auth", authRoute);

router.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ message: "You're not meant to be here :)" });
});

export default router;
