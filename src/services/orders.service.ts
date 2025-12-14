import prisma from "../config/prisma";

export const OrdersService = {
      async getAll() {
            return prisma.order.findMany();
      }
};
