import { eventBus } from "../events/eventBus";
import { prisma } from "../config/prisma";

eventBus.on("order:viewed", async ({ orderId }) => {
  console.log("[INTELLIGENCE] processing order", orderId);

  // simulate async intelligence
  await new Promise(r => setTimeout(r, 500));

  await prisma.order.update({
    where: { id: orderId },
    data: { state: "ANALYZED" },
  });
});