/*
  Warnings:

  - You are about to drop the column `rainUsername` on the `RankRewardClaim` table. All the data in the column will be lost.
  - Made the column `rainId` on table `RankRewardClaim` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "RankRewardClaim" DROP COLUMN "rainUsername",
ALTER COLUMN "rainId" SET NOT NULL;
