<<<<<<< HEAD
import prisma from "../config/prisma";

export const RidersService = {
      async getAll() {
            return prisma.rider.findMany();
      }
};
=======
import { PrismaClient } from "@prisma/client";
import { RiderStatus } from "../domain /rider-status";

export class RidersService {
  private prisma = new PrismaClient();

    async setStatus(riderId: string, status: RiderStatus) {
        return this.prisma.rider.update({
              where: { id: riderId },
                    data: { status }
                        });
                          }
                          }
                          
>>>>>>> backup/wip-1765743428
