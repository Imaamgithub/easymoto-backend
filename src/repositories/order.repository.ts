import { prisma } from "../prisma";
import { OrderState } from "../domain /order-state";

export class OrderRepository {
  static create() {
    return prisma.order.create({
      data: { state: OrderState.CREATED },
    });
  }

  static updateState(id: string, state: OrderState) {
    return prisma.order.update({
      where: { id },
      data: { state },
    });
  }

  static findById(id: string) {
    return prisma.order.findUnique({ where: { id } });
  }
}