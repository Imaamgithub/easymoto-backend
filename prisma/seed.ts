import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.order.create({
    data: {
      id: "123",
      state: "CREATED",

      customerName: "Imam Ahmad",
      customerPhone: "+251900000000",
      pickupAddress: "Bole, Addis Ababa",
      deliveryAddress: "Piassa, Addis Ababa",
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