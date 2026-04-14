import { Router } from "express";
import { getRiders } from "../controllers/riders.controller";
import { createRider } from "../controllers/riders.controller";
import express from "express";

const router = express.Router();

router.get("/", getRiders);
router.post("/", createRider);

export default router;
