import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.order.upsert({
    where: { id: "123" },
    update: {}, // no-op if exists
    create: {
      id: "123",
      state: "CREATED",
      customerName: "Test Customer",
      customerPhone: "+251900000000",
      pickupAddress: "Addis Ababa",
      deliveryAddress: "Bole, Addis Ababa",
    },
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });