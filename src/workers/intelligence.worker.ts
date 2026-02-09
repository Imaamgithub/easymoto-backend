import { eventBus } from "../events/eventBus";
eventBus.on("order:viewed", async ({ orderId }) => {
  console.log("[INTELLIGENCE] processing order", orderId);

await intelligenceQueue.add("analyze-order", {
    orderId: orderId,
})
  });

import { prisma } from "../config/prisma";
import { OrderState } from "@prisma/client";
import { Worker } from "bullmq";
import { connection } from "../infra/redis";
import { intelligenceQueue } from "../queues/intelligence.queue";

new Worker(
  "intelligence",
  async (job) => {
    console.log("🧠 Intelligence job:", job.data);
  },
  {
    connection,
  }
);