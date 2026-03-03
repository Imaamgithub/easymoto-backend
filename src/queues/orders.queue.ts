import { Queue } from "bullmq";
import { redis } from "../infra/redis";

export const ordersQueue = new Queue("orders", {
  connection: redis,
  defaultJobOptions: {
    removeOnComplete: 1000,
    removeOnFail: 5000,
    attempts: 5,
    backoff: {
      type: "exponential",
      delay: 3000,
    },
  },
});

await ordersQueue.add(
  "assign-rider",
  { orderId },
  {
    jobId: `order:${orderId}`, // 🔐 idempotency
  }
);