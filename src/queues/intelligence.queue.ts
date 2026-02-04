import { Queue } from "bullmq";
import { redis } from "../infra/redis";

export const intelligenceQueue = new Queue("intelligence", {
  connection: redis,
});