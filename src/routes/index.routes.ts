import { Router } from "express";
<<<<<<< HEAD
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
=======
import ordersRoutes from "./orders.routes";

const router = Router();

router.use("/orders", ordersRoutes);

export default router;
>>>>>>> backup/wip-1765743428
