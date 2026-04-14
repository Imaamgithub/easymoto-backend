import { prisma } from "../prisma";
import { OrderState } from "@prisma/client";

export class OrderRepository {
  static async create(data: {
    customerName: string;
    customerPhone?: string;
    pickupAddress: string;
    deliveryAddress: string;
    demo?: boolean;
  }) {
    return prisma.order.create({
    data: {
  customerId: "demo-user",
  customerName: "Test Customer",
  customerPhone: "123456789",
  amount: 100,
  pickupAddress: "Restaurant A",
  deliveryAddress: "Customer Home",
  pickupLat: 40.7128,
  pickupLng: -74.0060,
  deliveryLat: 40.7138,
  deliveryLng: -74.0070,
  state: "CREATED",
demo: true
    }
});
}

static async assign(orderId: string) {
    return prisma.order.update({
      where: { id: orderId },
      data: { state: OrderState.ASSIGNED },
    });
  }

  static async updateState(orderId: string, state: OrderState) {
    return prisma.order.update({
      where: { id: orderId },
      data: { state },
    });
  };
}