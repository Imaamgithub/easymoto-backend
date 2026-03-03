import { Worker } from "bullmq";
import { redis } from "../infra/redis";

export const ordersWorker = new Worker(
  "orders",
  async (job) => {
    try {
      switch (job.name) {
        case "assign-rider":
          await handleAssign(job.data.orderId);
          break;
        default:
          throw new Error(`Unknown job: ${job.name}`);
      }
    } catch (err) {
      console.error("Job failed", job.id, err);
      throw err; // REQUIRED so BullMQ retries
    }
  },
  {
    connection: redis,
    concurrency: Number(process.env.WORKER_CONCURRENCY ?? 5),
    lockDuration: 30000,
  }
);