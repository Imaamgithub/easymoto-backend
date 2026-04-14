import prisma from "../lib/prisma";
import { riderPerformanceGauge } from "../metrics/business.metrics";

export async function calculateRiderPerformance() {

  const riders = await prisma.rider.findMany();

  for (const rider of riders) {

    const totalOrders = rider.totalOrders || 1;

    const acceptanceRate =
      rider.acceptedOrders / totalOrders;

    const completionRate =
      rider.completedOrders / totalOrders;

    const cancelRate =
      rider.cancelledOrders / totalOrders;

    const onTimeRate =
      rider.onTimeDeliveries / totalOrders;

    const ratingScore = rider.customerRatingAvg / 5;

    const finalScore =
      acceptanceRate * 0.25 +
      completionRate * 0.25 +
      onTimeRate * 0.25 +
      ratingScore * 0.25 -
      cancelRate * 0.1;

    await prisma.rider.update({
      where: { id: rider.id },
      data: {
        performanceScore: finalScore
      }
    });
  }
}

export async function updateRiderPerformanceGauge() {
  const riders = await prisma.rider.findMany()

  for (const rider of riders) {
    const distance = Math.sqrt(
      (rider.latitude || 0) ** 2 + (rider.longitude || 0) ** 2
    );
    const distanceScore = 1 / (distance + 1);

    const ratingScore = rider.rating || 5;

    const finalScore = distanceScore + ratingScore;

    riderPerformanceGauge.set(
      { riderId: rider.id },
      finalScore
    );
  }
}


