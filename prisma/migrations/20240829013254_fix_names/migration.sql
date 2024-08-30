/*
  Warnings:

  - You are about to drop the column `createdAt` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `customers` table. All the data in the column will be lost.
  - The primary key for the `measures` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `confirmedValue` on the `measures` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `measures` table. All the data in the column will be lost.
  - You are about to drop the column `customers` on the `measures` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `measures` table. All the data in the column will be lost.
  - You are about to drop the column `measureDatetime` on the `measures` table. All the data in the column will be lost.
  - You are about to drop the column `measureType` on the `measures` table. All the data in the column will be lost.
  - You are about to drop the column `measureValue` on the `measures` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `measures` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `measures` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_code` to the `measures` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_url` to the `measures` table without a default value. This is not possible if the table is not empty.
  - Added the required column `measure_datetime` to the `measures` table without a default value. This is not possible if the table is not empty.
  - Added the required column `measure_type` to the `measures` table without a default value. This is not possible if the table is not empty.
  - The required column `measure_uuid` was added to the `measures` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `measure_value` to the `measures` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `measures` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "measures" DROP CONSTRAINT "measures_customers_fkey";

-- AlterTable
ALTER TABLE "customers" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "measures" DROP CONSTRAINT "measures_pkey",
DROP COLUMN "confirmedValue",
DROP COLUMN "createdAt",
DROP COLUMN "customers",
DROP COLUMN "imageUrl",
DROP COLUMN "measureDatetime",
DROP COLUMN "measureType",
DROP COLUMN "measureValue",
DROP COLUMN "updatedAt",
DROP COLUMN "uuid",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "customer_code" TEXT NOT NULL,
ADD COLUMN     "has_confirmed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "image_url" TEXT NOT NULL,
ADD COLUMN     "measure_datetime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "measure_type" "MeasureType" NOT NULL,
ADD COLUMN     "measure_uuid" TEXT NOT NULL,
ADD COLUMN     "measure_value" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "measures_pkey" PRIMARY KEY ("measure_uuid");

-- AddForeignKey
ALTER TABLE "measures" ADD CONSTRAINT "measures_customer_code_fkey" FOREIGN KEY ("customer_code") REFERENCES "customers"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
