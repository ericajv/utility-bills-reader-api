-- CreateEnum
CREATE TYPE "MeasureType" AS ENUM ('WATER', 'GAS');

-- CreateTable
CREATE TABLE "customers" (
    "uuid" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "measures" (
    "uuid" TEXT NOT NULL,
    "measureType" "MeasureType" NOT NULL,
    "measureValue" DOUBLE PRECISION NOT NULL,
    "confirmedValue" BOOLEAN NOT NULL DEFAULT false,
    "imageUrl" TEXT NOT NULL,
    "measureDatetime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "customers" TEXT NOT NULL,

    CONSTRAINT "measures_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_code_key" ON "customers"("code");

-- AddForeignKey
ALTER TABLE "measures" ADD CONSTRAINT "measures_customers_fkey" FOREIGN KEY ("customers") REFERENCES "customers"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
