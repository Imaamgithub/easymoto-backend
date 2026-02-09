import { Router } from "express";
const router = Router();
export default router;

import { runDemo } from "../controllers/demo.controller";

router.post("/demo", runDemo);
