import { Request, Response } from "express";
import { OrdersService } from "../services/orders.service";
import { OrderState } from "@prisma/client";

export const runDemo = async (_req: Request, res: Response) => {
  const order = await OrdersService.create({
    customerName: "Demo User",
    customerPhone: "0000000000",
    pickupAddress: "Warehouse A",
    deliveryAddress: "Customer B",
    demo: true,
  });

  // 2. Progress lifecycle
  await OrdersService.updateState(order.id, OrderState.ASSIGNED);
  await OrdersService.updateState(order.id, OrderState.ACCEPTED);
  await OrdersService.updateState(order.id, OrderState.PICKED_UP);
  await OrdersService.updateState(order.id, OrderState.DELIVERED);

  res.json({
    message: "Demo completed",
    orderId: order.id,
  });
};
