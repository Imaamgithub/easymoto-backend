import { Router } from "express";
<<<<<<< HEAD
import { getOrders } from "../controllers/orders.controller";

const router = Router();

router.get("/", getOrders);

export default router;
=======
import { createOrder, assignOrder } from "../controllers/orders.controller";

const router = Router();

router.post("/", createOrder);
router.post("/assign", assignOrder);

export default router;
>>>>>>> backup/wip-1765743428
