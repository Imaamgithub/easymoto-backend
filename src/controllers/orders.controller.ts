import { Request, Response } from "express";
import { OrdersService } from "../services/orders.service";
import { OrderState } from "../domain /order-state";

export const pickupOrder = (req: Request, res: Response) => {
  const order = OrdersService.changeState(req.body.order, OrderState.PICKED_UP);
  res.json(order);
};