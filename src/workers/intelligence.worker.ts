import { eventBus } from "../events/eventBus";
eventBus.on("order:viewed", async ({ orderId }) => {
  console.log("[INTELLIGENCE] processing order", orderId);

  // simulate async intelligence
  await new Promise(r => setTimeout(r, 500));
  });
import { Worker } from "bullmq";
import { redis } from "../infra/redis";
import { prisma } from "../config/prisma";
import { OrderState } from "@prisma/client";

new Worker(
  "intelligence",
  async job => {
    const { orderId } = job.data;

    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) throw new Error("Order not found");

// 🔮 Intelligence logic
await prisma.order.update({
  where: { id: orderId },
  data: { state: OrderState.ASSIGNED },
});

    return { success: true };
  },
  { connection: redis }
);