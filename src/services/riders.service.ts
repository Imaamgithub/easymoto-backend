import { prisma } from "../config/prisma";
export class RidersService {
  static async getAll() {
    return prisma.rider.findMany();
  }
}

import { PrismaClient } from "@prisma/client";
import { RiderStatus } from "../domain /rider-status";
                          
