import { Router } from "express";
import { createOrder, assignOrder } from "../controllers/orders.controller";

const router = Router();

router.post("/", createOrder);
router.post("/assign", assignOrder);

export default router;