import { redisClient } from '../lib/redis'

export async function updateRiderLocation(
  riderId: string,
  latitude: number,
  longitude: number
) {
  await redisClient.geoAdd('riders:locations', {
    member: riderId,
    latitude,
    longitude
  })

  // Push updates to Redis stream for WebSocket notifications
  await redisClient.xAdd('riders:stream', '*', {
    riderId,
    latitude: latitude.toString(),
    longitude: longitude.toString()
  })
}