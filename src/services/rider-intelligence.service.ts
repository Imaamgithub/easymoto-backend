import { prisma } from "../prisma.schema";
export const RiderIntelligenceService = {
  async calculateScore(riderId: string) {
    const rider = await prisma.rider.findUnique({
      where: { id: riderId },
    });

    if (!rider) throw new Error("Rider not found");

    const onTimeRate =
      rider.totalOrders === 0
        ? 0
        : rider.onTimeDeliveries / rider.totalOrders;

    const acceptanceRate =
      rider.totalOrders === 0
        ? 0
        : rider.acceptedOrders / rider.totalOrders;

    const completionRate =
      rider.totalOrders === 0
        ? 0
        : rider.completedOrders / rider.totalOrders;

    const cancellationRate =
      rider.totalOrders === 0
        ? 0
        : rider.cancelledOrders / rider.totalOrders;

    const ratingNormalized = rider.customerRatingAvg / 5;

    let score =
      0.35 * onTimeRate +
      0.20 * acceptanceRate +
      0.20 * completionRate +
      0.15 * ratingNormalized -
      0.10 * cancellationRate;

    score = Math.max(0, Math.min(score, 1));

    const finalScore = score * 100;

    await prisma.rider.update({
      where: { id: riderId },
      data: { performanceScore: finalScore },
    });

    return finalScore;
  },
};

import { riderPerformanceGauge } from "../observability/metrics";

await prisma.rider.update({ where:{id:riderId}, data:{ performanceScore: finalScore }});
riderPerformanceGauge.set({ riderId, riderName: rider.name || "" }, finalScore);