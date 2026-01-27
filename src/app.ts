import express from "express";
import orderIntelligenceRoutes from "./services/intelligence/orderIntelligence.routes";

const app = express();

app.use(express.json());

app.use("/intelligence", orderIntelligenceRoutes);

export default app;

import healthRoutes from "./health/health.routes";
import readyRoutes from "./health/ready.routes";

app.use(healthRoutes);
app.use(readyRoutes);