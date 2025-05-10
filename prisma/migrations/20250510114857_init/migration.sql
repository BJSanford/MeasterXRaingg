-- CreateTable
CREATE TABLE "UserVerification" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "discordId" TEXT NOT NULL,
    "discordUsername" TEXT NOT NULL,
    "rainUsername" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "UserVerification_discordId_key" ON "UserVerification"("discordId");
