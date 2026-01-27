// src/services/intelligence/orderIntelligence.controller.ts
import { Request, Response } from "express";
import { OrderIntelligenceService } from "./orderIntelligence.service";

export const getOrderHealth = async (req: Request, res: Response) => {
  try {
    const data = await OrderIntelligenceService.getOrderHealth(
      req.params.id
    );
    res.json(data);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};