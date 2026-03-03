/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `Rider` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dropoffLat` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dropoffLng` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickupLat` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickupLng` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RiderTier" AS ENUM ('BRONZE', 'SILVER', 'GOLD');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "dropoffLat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "dropoffLng" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "pickupLat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "pickupLng" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Rider" ADD COLUMN     "acceptanceRate" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION,
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL DEFAULT 5.0,
ADD COLUMN     "tier" "RiderTier" NOT NULL DEFAULT 'BRONZE',
ALTER COLUMN "status" SET DEFAULT 'AVAILABLE';

-- CreateIndex
CREATE UNIQUE INDEX "Rider_phone_key" ON "Rider"("phone");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_riderId_fkey" FOREIGN KEY ("riderId") REFERENCES "Rider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
