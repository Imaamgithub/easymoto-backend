import { Request, Response } from "express";
import { OrdersService } from "../services/orders.service";

export const createDemoOrder = async (req: Request, res: Response) => {
  try {
    const order = await OrdersService.createOrder({
      customerName: "Demo Customer",
      pickupAddress: "Bole",
      deliveryAddress: "CMC",
      demo: true,
    });

    await OrdersService.assignOrder(order.id);
    await OrdersService.acceptOrder(order.id);
    await OrdersService.pickupOrder(order.id);
    await OrdersService.deliverOrder(order.id);

    res.status(201).json({
      message: "Demo order completed",
      orderId: order.id,
    });
  } catch (error) {
    console.error("Demo flow failed:", error);
    res.status(500).json({
      error: "Demo order failed",
    });
  }
};