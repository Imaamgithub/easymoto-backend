// src/services/batch-delivery.service.ts
import prisma from '../lib/prisma'
import { findNearbyRiders } from './geo.service'
import { Order } from "../types/models"
export async function assignBatchOrders(orderIds: string[]) {
  const orders = await prisma.order.findMany({
    where: { id: { in: orderIds } }
  })

  if (orders.length === 0) return null

  const riderCandidates = await findNearbyRiders(
    orders[0].pickupLat,
    orders[0].pickupLng
  )

  const rider = await prisma.rider.findFirst({
    where: { id: { in: riderCandidates }, isAvailable: true }
  })

  if (!rider) return null

  await prisma.order.updateMany({
    where: { id: { in: orderIds } },
    data: {
      riderId: rider.id,
      state: "ASSIGNED"
    }
  })

  return rider
}