import { prisma } from "../config/prisma";
import { OrderState } from "@prisma/client";

export class OrdersService {
  static async getAll() {
    return prisma.order.findMany();
  }

  static async getById(id: string) {
    return prisma.order.findUnique({ where: { id } });
  }

  static async create(data: {
    customerName: string;
    customerPhone: string;
    pickupAddress: string;
    deliveryAddress: string;
    demo?: boolean;
  }) {
    return prisma.order.create({
      data: {
        ...data,
        state: OrderState.CREATED,
      },
    });
  }

  static async updateState(id: string, state: OrderState) {
    return prisma.order.update({
      where: { id },
      data: { state },
    });
  }
}