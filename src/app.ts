import express from "express";
<<<<<<< HEAD
import routes from "./routes/index.routes";
=======
import orderIntelligenceRoutes from "./services/intelligence/orderIntelligence.routes";
>>>>>>> backup/wip-1765743428

const app = express();

app.use(express.json());

<<<<<<< HEAD
// Register all routes
app.use("/", routes);

export default app;
=======
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
>>>>>>> backup/wip-1765743428
