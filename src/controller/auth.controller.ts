import type { Request, Response } from "express";
import User from "../model/user.model";

import bcrypt from "bcryptjs";
import MailService from "../service/mail.service";

class AuthController {
  async register(req: Request, res: Response) {
    const { name, password, email } = req.body;
    if (!name || !password || !email)
      return res.status(400).json({
        success: false,
        message: "Please provide all required parameters",
      });

    let user = await User.findOne({ email: email });
    if (user)
      return res
        .status(409)
        .json({ success: false, message: "email already exists" });

    user = await new User({
      name: name,
      password: password,
      email: email,
    }).save();
    await new MailService().sendEmailVerificationMail(name, email);
    return res
      .status(201)
      .json({ success: true, message: "User created", user });
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }).select("+password");
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email or password" });
    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email or password" });

    res.status(200).json({ success: true, message: "Login Successfull", user });
  }
}

export default new AuthController();
