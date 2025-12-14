import { Router } from "express";
import { getOrders } from "../controllers/orders.controller";

const router = Router();

router.get("/", getOrders);

export default router;
