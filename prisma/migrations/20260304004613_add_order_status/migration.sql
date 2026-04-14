/*
  Warnings:

  - You are about to drop the column `dropoffLat` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `dropoffLng` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `riderId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `acceptanceRate` on the `Rider` table. All the data in the column will be lost.
  - You are about to drop the column `acceptedOrders` on the `Rider` table. All the data in the column will be lost.
  - You are about to drop the column `cancelledOrders` on the `Rider` table. All the data in the column will be lost.
  - You are about to drop the column `completedOrders` on the `Rider` table. All the data in the column will be lost.
  - You are about to drop the column `customerRatingAvg` on the `Rider` table. All the data in the column will be lost.
  - You are about to drop the column `isAvailable` on the `Rider` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `Rider` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Rider` table. All the data in the column will be lost.
  - You are about to drop the column `onTimeDeliveries` on the `Rider` table. All the data in the column will be lost.
  - You are about to drop the column `performanceScore` on the `Rider` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Rider` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Rider` table. All the data in the column will be lost.
  - You are about to drop the column `rejectedOrders` on the `Rider` table. All the data in the column will be lost.
  - You are about to drop the column `tier` on the `Rider` table. All the data in the column will be lost.
  - You are about to drop the column `totalOrders` on the `Rider` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Rider` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "OrderState" ADD VALUE 'PENDING';

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_riderId_fkey";

-- DropIndex
DROP INDEX "Rider_phone_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "dropoffLat",
DROP COLUMN "dropoffLng",
DROP COLUMN "riderId";

-- AlterTable
ALTER TABLE "Rider" DROP COLUMN "acceptanceRate",
DROP COLUMN "acceptedOrders",
DROP COLUMN "cancelledOrders",
DROP COLUMN "completedOrders",
DROP COLUMN "customerRatingAvg",
DROP COLUMN "isAvailable",
DROP COLUMN "latitude",
DROP COLUMN "longitude",
DROP COLUMN "onTimeDeliveries",
DROP COLUMN "performanceScore",
DROP COLUMN "phone",
DROP COLUMN "rating",
DROP COLUMN "rejectedOrders",
DROP COLUMN "tier",
DROP COLUMN "totalOrders",
DROP COLUMN "updatedAt",
ALTER COLUMN "status" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password";

-- DropEnum
DROP TYPE "RiderTier";
