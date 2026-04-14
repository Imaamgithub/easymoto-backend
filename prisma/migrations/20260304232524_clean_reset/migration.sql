/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `Rider` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `amount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryLat` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryLng` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Rider` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RiderTier" AS ENUM ('BRONZE', 'SILVER', 'GOLD');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "customerId" TEXT NOT NULL,
ADD COLUMN     "deliveryLat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "deliveryLng" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "riderId" TEXT;

-- AlterTable
ALTER TABLE "Rider" ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL DEFAULT 5,
ADD COLUMN     "tier" "RiderTier" NOT NULL DEFAULT 'BRONZE';

-- CreateIndex
CREATE UNIQUE INDEX "Rider_phone_key" ON "Rider"("phone");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_riderId_fkey" FOREIGN KEY ("riderId") REFERENCES "Rider"("id") ON DELETE SET NULL ON UPDATE CASCADE;
