<<<<<<< HEAD
import prisma from "../config/prisma";

export const OrdersService = {
      async getAll() {
            return prisma.order.findMany();
      }
};
=======
import { OrderState } from "../domain /order-state";
import { transitionOrder } from "../domain /order-state-machine";
import { Order } from "../models/Order";
import { prisma } from "../prisma";

import { OrderRepository } from "../repositories/order.repository";

export class OrdersService {
  static async createOrder(data: any) {
    return OrderRepository.create(data);
  }

  static async assignOrder(orderId: string) {
    return OrderRepository.assign(orderId);
  }

  static async acceptOrder(orderId: string) {
    return OrderRepository.updateState(orderId, "ACCEPTED");
  }

  static async pickupOrder(orderId: string) {
    return OrderRepository.updateState(orderId, "PICKED_UP");
  }

  static async deliverOrder(orderId: string) {
    return OrderRepository.updateState(orderId, "DELIVERED");
  }

static async changeState(orderId: string, state: OrderState) {
  return prisma.order.update({
    where: { id: orderId },
    data: { state },
  });
}  
}
>>>>>>> backup/wip-1765743428
