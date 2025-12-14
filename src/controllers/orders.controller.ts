import { Request, Response } from "express";
import { OrdersService } from "../services/orders.service";

export const getOrders = async (_req: Request, res: Response) => {
      const orders = await OrdersService.getAll();
        res.json(orders);
};
