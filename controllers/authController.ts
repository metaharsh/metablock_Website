import User from "../models/UserModel";
import { Request, Response } from "express";
import tryCatchWrapper from "../wrappers/tryCatchWrapper";
class AuthController {
  async Register(req: Request, res: Response) {
    const { name, password, phone, email } = req.body;
  }
}
