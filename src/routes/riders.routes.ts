import { Router } from "express";
import { getRiders } from "../controllers/riders.controller";

const router = Router();

router.get("/", getRiders);

export default router;
