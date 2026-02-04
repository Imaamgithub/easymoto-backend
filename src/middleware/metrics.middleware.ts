import { Request, Response, NextFunction } from "express";
import { httpRequestDuration, httpRequestsTotal } from "../observability/metrics";

export function metricsMiddleware(req: Request, res: Response, next: NextFunction) {
  const end = httpRequestDuration.startTimer({ method: req.method });

  res.on("finish", () => {
    const route = req.route?.path || req.path;
    end({ route, status: res.statusCode });
    httpRequestsTotal.inc({
      method: req.method,
      route,
      status: res.statusCode,
    });
  });

  next();
}