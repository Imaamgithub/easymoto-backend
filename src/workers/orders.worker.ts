import { Worker } from "bullmq";
import { redisClient } from "../infra/redis";
import { dispatchOrder } from "../services/dispatch.service"

export const ordersWorker = new Worker(
  "orders",
  async (job) => {
    try {
      switch (job.name) {
        case "assign-rider":
          await handleAssign(job.data.orderId);
          await dispatchOrder(job.data.orderId);
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
  connection: {
    host: "127.0.0.1",
    port: 6379
  },
  concurrency: Number(process.env.WORKER_CONCURRENCY ?? 5),
  lockDuration: 30000,
}
);
function handleAssign(orderId: any) {
  throw new Error("Function not implemented.");
}

