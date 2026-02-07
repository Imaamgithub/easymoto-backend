import { Request, Response, NextFunction } from "express";

export const idempotency = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const originalJson = res.json.bind(res);

  res.json = ((body: any) => {
    // future: persist by idempotency-key
    return originalJson(body);
  }) as typeof res.json;

  next();
};
