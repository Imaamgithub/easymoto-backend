// src/services/intelligence/orderIntelligence.routes.ts
import { Router } from "express";
import { getOrderHealth } from "./orderIntelligence.controller";
import { requireRole } from "../../middleware/requireRole";

const router = Router();

router.get("/orders/:id", getOrderHealth);

router.get(
  "/intelligence/orders/:id",
  requireRole("ADMIN", "OPERATOR"),
  getOrderHealth
);

export default router;
