import { Router } from "express";
import ordersRoutes from "./orders.routes";
import demoRoutes from "./demo.routes";

const router = Router();

router.use("/orders", ordersRoutes);
router.use("/demo", demoRoutes);

export default router;