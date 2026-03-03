import { prisma } from "../lib/prisma"
import { calculateDistance } from "../utils/distance"

export const findBestRider = async (
  pickupLat: number,
  pickupLng: number
) => {
  const riders = await prisma.rider.findMany({
    where: {
      isAvailable: true,
      latitude: { not: null },
      longitude: { not: null }
    }
  })

  const scored = riders
    .map(rider => {
      const distance = calculateDistance(
        pickupLat,
        pickupLng,
        rider.latitude!,
        rider.longitude!
      )

      return { rider, distance }
    })
    .filter(r => r.distance <= 10) // 10km radius

  if (scored.length === 0) return null

  scored.sort((a, b) => a.distance - b.distance)

  return scored[0].rider
}