import prisma from "../lib/prisma"
import { calculateDistance } from "../utils/distance"
import { Order } from '../types/models'

export async function assignRiderToOrder(orderId: string) {
  const order = await prisma.order.findUnique({
    where: { id: orderId }
  })

  if (!order) throw new Error("Order not found")

  const riders = await prisma.rider.findMany({
    where: {
      isAvailable: true,
      latitude: { not: null },
      longitude: { not: null }
    }
  })

  if (!riders.length) throw new Error("No available riders")

  const scored = riders.map(rider => ({
    rider,
    distance: calculateDistance(
      order.pickupLat,
      order.pickupLng,
      rider.latitude!,
      rider.longitude!
    )
  }))

  scored.sort((a, b) => a.distance - b.distance)

  const best = scored[0].rider

  await prisma.$transaction([
    prisma.order.update({
      where: { id: orderId },
      data: {
        riderId: best.id
      }
    }),
    prisma.rider.update({
      where: { id: best.id },
      data: { isAvailable: false }
    })
  ])

  return best
}

interface RiderCandidate {
  riderId: string
  distance: number
  rating: number
  tier: string
}

function tierScore(tier: string) {
  if (tier === 'GOLD') return 1
  if (tier === 'SILVER') return 2
  return 3
}

function computeScore(
  distance: number,
  rating: number,
  tier: string
) {

  return (
    distance * 0.6 +
    (5 - rating) * 0.3 +
    tierScore(tier) * 0.1
  )

}

import { redisClient } from '../lib/redis'

export async function dispatchOrder(order: Order) {

  const riders = await redisClient.sendCommand([
    'GEORADIUS',
    'riders',
    order.pickupLng.toString(),
    order.pickupLat.toString(),
    '5',
    'km'
  ]) as string[]

  if (riders.length === 0) return null

  const riderRecords = await prisma.rider.findMany({
    where: {
      id: { in: riders },
      isAvailable: true
    }
  })

  const scored: RiderCandidate[] = riderRecords.map(rider => {

    const distance = calculateDistance(
      order.pickupLat,
      order.pickupLng,
      rider.latitude!,
      rider.longitude!
    )

    return {
      riderId: rider.id,
      distance,
      rating: rider.rating,
      tier: rider.tier
    }

  })

  scored.sort((a, b) => {
    return computeScore(a.distance, a.rating, a.tier)
      - computeScore(b.distance, b.rating, b.tier)
  })

  const best = scored[0]

  await prisma.order.update({
    where: { id: order.id },
    data: {
      riderId: best.riderId
    }
  })

  return best.riderId
}