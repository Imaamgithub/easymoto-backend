import express from "express";
import ordersRoutes from "./routes/orders.routes";

const app = express();

app.use((req, res, next) => {
  console.log("🔥 REQUEST:", req.method, req.url);
  console.log("BODY:", req.body);
  next();
});

app.use(express.json());

// ✅ THIS LINE IS CRITICAL
app.use("/orders", ordersRoutes);
// test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

import routes from "./routes/index.routes";

import orderIntelligenceRoutes from "./services/intelligence/orderIntelligence.routes";

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.use(express.json());


export default app;
app.use("/intelligence", orderIntelligenceRoutes);


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
app.use("/api", demoRoutes);


import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"


app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

import ridersRoutes from "./routes/riders.routes";

app.use("/riders", ridersRoutes);