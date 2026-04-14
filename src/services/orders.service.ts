import prisma from "../lib/prisma";
import { OrderState } from "@prisma/client";

export class OrdersService {

  static async create(data: any) {
    return prisma.order.create({
      data: {
        ...data,
        state: "CREATED",
      },
    });
  }

  static async getAll() {
    return prisma.order.findMany({
      orderBy: { createdAt: "desc" }
    });
  }

  static async getById(id: string) {
    return prisma.order.findUnique({
      where: { id }
    });
  }

  static async assign(orderId: string, riderId: string) {
    return prisma.order.update({
      where: { id: orderId },
      data: {
        riderId,
        state: "ASSIGNED",
      },
    });
  }

  static async accept(orderId: string) {
    return prisma.order.update({
      where: { id: orderId },
      data: {
        state: "ACCEPTED",
      },
    });
  }

  static async pickup(orderId: string) {
    return prisma.order.update({
      where: { id: orderId },
      data: { state: "PICKED_UP" }
    });
  }

  static async updateState(orderId: string, state: any) {
    return prisma.order.update({
      where: { id: orderId },
      data: { state },
    });
  }
}
