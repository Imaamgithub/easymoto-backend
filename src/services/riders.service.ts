import prisma from "../config/prisma";

export const RidersService = {
      async getAll() {
            return prisma.rider.findMany();
      }
};
