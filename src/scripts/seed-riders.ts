import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.rider.createMany({
    data: [
      {
        name: "Rider A",
        phone: "0900000001",
        status: "AVAILABLE",
      },
      {
        name: "Rider B",
        phone: "0900000002",
        status: "AVAILABLE",
      },
      {
        name: "Rider C",
        phone: "0900000003",
        status: "AVAILABLE",
      },
    ],
  });

  console.log("Riders seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });