/*
  Warnings:

  - A unique constraint covering the columns `[discordId]` on the table `UserVerification` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "UserVerification" ALTER COLUMN "discordId" DROP NOT NULL,
ALTER COLUMN "discordUsername" DROP NOT NULL,
ALTER COLUMN "verified" SET DEFAULT false;

-- CreateTable
CREATE TABLE "RankRewardClaim" (
    "id" SERIAL NOT NULL,
    "rainUsername" TEXT NOT NULL,
    "rewardAmount" DOUBLE PRECISION NOT NULL,
    "claimedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RankRewardClaim_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserVerification_discordId_key" ON "UserVerification"("discordId");
