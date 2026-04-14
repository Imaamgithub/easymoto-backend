// src/services/ai-demand.service.ts
import { redisClient } from '../lib/redis'

interface ZoneDemand {
  zoneId: string
  demandScore: number
}

export async function predictZoneDemand(): Promise<ZoneDemand[]> {
  // Example logic: replace with ML model later
  const zones = ['A1','A2','B1','B2','C1','C2']
  return zones.map(zone => ({
    zoneId: zone,
    demandScore: Math.random() // 0..1
  }))
}

// Push hot zones to Redis for riders
export async function updateHotZones() {
  const predictions = await predictZoneDemand()
  for (const zone of predictions) {
    await redisClient.hSet('zones:hot', zone.zoneId, zone.demandScore)
  }
}