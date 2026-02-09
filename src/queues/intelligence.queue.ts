import { Queue } from "bullmq";
import { connection } from "../infra/redis";

export const intelligenceQueue = new Queue("intelligence", {
  connection,
});