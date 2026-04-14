import { createClient } from "redis"
import { redisClient } from "../lib/redis"

const redis = createClient({ url: "redis://localhost:6379" })
redis.connect()

export async function findNearbyRiders(
  lat: number,
  lng: number
): Promise<string[]> {
  const riders = await redis.geoSearch(
    "riders:locations",
    {
      longitude: lng,
      latitude: lat
    },
    {
      radius: 3,
      unit: "km"
    }
  )
  return riders
}

export async function findNearbyRidersByPickup(
  pickupLat: number,
  pickupLng: number,
  radiusKm = 5
): Promise<string[]> {
  const riders = await redisClient.geoSearch(
    'riders:locations',
    {
      latitude: pickupLat,
      longitude: pickupLng
    },
    { radius: radiusKm, unit: 'km' }
  )

  return riders
}

// geo.service.ts
interface Rider {
  id: string
  rating: number
  tier: 'BRONZE' | 'SILVER' | 'GOLD'
  isAvailable: boolean
  latitude: number
  longitude: number
}

interface Order {
  id: string
  pickupLat: number
  pickupLng: number
  dropoffLat: number
  dropoffLng: number
}
