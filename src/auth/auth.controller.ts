import { Request, Response } from "express";
import { AuthService } from "./auth.service";

export const login = async (req: Request, res: Response) => {
  const { userId, role } = req.body;

  const token = AuthService.generateToken(userId, role);

  res.json({ token });
};