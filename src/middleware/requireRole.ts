import { Request, Response, NextFunction } from "express";

export const requireRole = (...roles: string[]) => {
  return (req: Request & { user?: { role?: string } }, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role || "")) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  };
};