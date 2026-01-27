// src/services/intelligence/orderIntelligence.service.ts
import { prisma } from "../../config/prisma";
import { OrderState } from "../../domain /order-state";
import { eventBus } from "../../events/eventBus";

export class OrderIntelligenceService {
  static async getOrderHealth(orderId: string) {
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new Error("Order not found");

    const now = Date.now();
    const ageMinutes =
      (now - order.createdAt.getTime()) / 60000;

    let health = "HEALTHY";

    if (order.state === OrderState.CREATED && ageMinutes > 5)
      health = "AT_RISK";

    if (
      order.state === OrderState.ASSIGNED &&
      ageMinutes > 10
    )
      health = "AT_RISK";

    if (
      order.state === OrderState.PICKED_UP &&
      ageMinutes > 20
    )
      health = "STUCK";

    const payload = {
      orderId,
      state: order.state,
      ageMinutes: Math.floor(ageMinutes),
      health,
    };

    eventBus.emit("order:viewed", { orderId });

    return payload;
  }
}