import express from "express";
import orderIntelligenceRoutes from "./services/intelligence/orderIntelligence.routes";

const app = express();

app.use(express.json());

app.use("/intelligence", orderIntelligenceRoutes);

export default app;

import healthRoutes from "./health/health.routes";
import readyRoutes from "./health/ready.routes";

import { idempotency } from "./middleware/idempotency";
app.use(express.json());
app.use(idempotency);

app.use(healthRoutes);
app.use(readyRoutes);

import { metricsMiddleware } from "./middleware/metrics.middleware";
import { register } from "./observability/metrics";
app.use(metricsMiddleware);

app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

import demoRoutes from "./routes/demo.routes";
app.use("/demo", demoRoutes);
