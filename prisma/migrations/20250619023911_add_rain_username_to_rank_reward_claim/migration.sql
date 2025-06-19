/*
  Warnings:

  - Added the required column `rainUsername` to the `RankRewardClaim` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RankRewardClaim" ADD COLUMN "rainUsername" TEXT DEFAULT 'unknown' NOT NULL;
