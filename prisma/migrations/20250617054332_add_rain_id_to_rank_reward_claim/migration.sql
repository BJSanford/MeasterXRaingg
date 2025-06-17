/*
  Warnings:

  - Added the required column `rainId` to the `RankRewardClaim` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RankRewardClaim" ADD COLUMN "rainId" TEXT;
