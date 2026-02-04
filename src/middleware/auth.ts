import { Request, Response, NextFunction } from "express";

export const mockAuth = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  // mock user for demo / dev
  (req as any).user = {
    id: "demo-user",
    role: "ADMIN",
  };

  next();
};