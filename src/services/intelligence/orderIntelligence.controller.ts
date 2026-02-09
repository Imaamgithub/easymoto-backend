// src/services/intelligence/orderIntelligence.controller.ts
import { Request, Response } from "express";
import { OrderIntelligenceService } from "./orderIntelligence.service";
import { intelligenceQueue } from "../../queues/intelligence.queue";

export const getOrderHealth = async (req: Request, res: Response) => {
  try {
    const data = await OrderIntelligenceService.getOrderHealth(
      String(req.params.id)
    );
    await intelligenceQueue.add("analyze-order", {
      orderId: req.params.id,
    });
    res.json(data);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};