// src/services/realtime-dispatch.service.ts
import { dispatchOrder } from './dispatch.service'
import { redisClient } from "../infra/redis"
import { updateHotZones } from './ai-demand.service'
import { assignBatchOrders } from './batch-delivery.service'
import { Order } from "@prisma/client";
import { io } from "../infra/socket";
export async function processIncomingOrders(orders: Order[]) {

  // Step 1: Update hot zones (AI prediction)
  await updateHotZones()

  // Step 2: Group orders by proximity for batch delivery
  const batchGroups = groupOrdersByProximity(orders)

  // Step 3: Assign each batch
  for (const batch of batchGroups) {
    await assignBatchOrders(batch.map(o => o.id))
  }

  // Step 4: Fallback: assign remaining orders individually
  for (const order of orders) {
    if (!order.riderId) await dispatchOrder(order as any)
}
}
// Simple proximity grouping
function groupOrdersByProximity(orders: Order[]): Order[][] {
  const batches: Order[][] = []
  const radiusKm = 2
  while (orders.length) {
    const baseOrder = orders.shift()!
    const batch = [baseOrder]
    for (let i = orders.length - 1; i >= 0; i--) {
      const o = orders[i]
      const distance = getDistance(
        baseOrder.pickupLat,
        baseOrder.pickupLng,
        o.pickupLat,
        o.pickupLng
      )
      if (distance <= radiusKm) {
        batch.push(o)
        orders.splice(i, 1)
      }
    }
    batches.push(batch)
  }
  return batches
}

// Haversine distance
function getDistance(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI/180
  const dLng = (lng2 - lng1) * Math.PI/180
  const a = Math.sin(dLat/2)**2 +
            Math.cos(lat1*Math.PI/180) *
            Math.cos(lat2*Math.PI/180) *
            Math.sin(dLng/2)**2
  return 2*R*Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
}

async function getZones() {
  return await redisClient.hGetAll("zones:hot");
}

async function initializeHotZones() {
  const zones = await getZones();
  io.emit('hot_zone_update', {
    zones
  })
}

initializeHotZones().catch(err => console.error('Failed to initialize hot zones:', err));

