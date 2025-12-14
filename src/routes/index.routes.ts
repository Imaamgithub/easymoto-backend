import { Router } from "express";
import { rootController } from "../controllers/root.controller";
import { helloController } from "../controllers/hello.controller";
import ordersRoutes from "./orders.routes";
import ridersRoutes from "./riders.routes";

const router = Router();

router.get("/", rootController);
router.get("/hello", helloController);

router.use("/orders", ordersRoutes);
router.use("/riders", ridersRoutes);

export default router;
