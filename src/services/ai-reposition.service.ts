import { redisClient } from '../lib/redis'

export async function getHotZones() {

  const zones = [
    'bole',
    'kazanchis',
    'piassa',
    'megenagna'
  ]

  const scores = []

  for (const zone of zones) {

    const demand = await redisClient.get(`demand:zone:${zone}`)

    scores.push({
      zone,
      demand: Number(demand || 0)
    })

  }

  scores.sort((a,b) => b.demand - a.demand)

  return scores.slice(0,3)
}