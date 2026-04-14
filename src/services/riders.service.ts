import prisma from "../lib/prisma"

export class RidersService {
  static create(body: any) {
    throw new Error("Method not implemented.");
  }
  static async getAll() {
    return prisma.rider.findMany();
  }
}

import { PrismaClient } from "@prisma/client";
import { RiderStatus } from "../domain /rider-status";
                          

export async function getRidersByIds(ids: string[]) {

  return prisma.rider.findMany({
    where: {
      id: {
        in: ids
      }
    }
  })
}