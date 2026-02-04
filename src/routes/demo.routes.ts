import { Router } from "express";
import { createDemoOrder } from "../controllers/demo.controller";

const router = Router();

router.post("/order", createDemoOrder);

export default router;