import { Router } from "express";
import { prisma } from "../config/prisma";

const router = Router();

router.get("/ready", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ ready: true });
  } catch {
    res.status(503).json({ ready: false });
  }
});

export default router;