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
        customerName: data.customerName,
        customerPhone: data.customerPhone ?? "0000000000",
        pickupAddress: data.pickupAddress,
        deliveryAddress: data.deliveryAddress,
        state: OrderState.CREATED,
        demo: data.demo ?? false,
      },
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
  }
}