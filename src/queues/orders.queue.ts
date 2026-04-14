import { Queue } from "bullmq";
import { redisClient } from "../infra/redis";
import { prisma } from "../prisma";

export const ordersQueue = new Queue("orders", {
  connection: {
  host: "127.0.0.1",
  port: 6379
}
});

export async function enqueueOrder(orderId: string) {
  await ordersQueue.add(
    "assign",
    { orderId },
    {
      jobId: `order:${orderId}`
    }
  );
}


async function createOrder() {
  await prisma.order.create({
    data: {
      customerId: "demo-user",
      customerName: "Test Customer",
      customerPhone: "123456789",
      amount: 100,
      pickupAddress: "Restaurant A",
      deliveryAddress: "Customer Home",
      pickupLat: 40.7128,
      pickupLng: -74.0060,
      deliveryLat: 40.7138,
      deliveryLng: -74.0070,
      state: "CREATED"
    }
  });
}


const customerId = "demo-user";

data: {
  customerId: customerId
}