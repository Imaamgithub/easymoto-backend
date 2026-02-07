import { Request, Response } from "express";
import { OrdersService } from "../services/orders.service";

export const getOrders = async (_req: Request, res: Response) => {
      const orders = await OrdersService.getAll();
        res.json(orders);
};
import { OrderState } from "../domain /order-state";

export const createOrder = async (req: Request, res: Response) => {
  const order = await OrdersService.createOrder(req.body);
  res.status(201).json(order);
};

export const assignOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await OrdersService.assignOrder(id);
  res.json(order);
};

export const pickupOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await OrdersService.pickupOrder(id);
  res.json(order);
};


