-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserVerification" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "discordId" TEXT,
    "discordUsername" TEXT,
    "rainUsername" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_UserVerification" ("discordId", "discordUsername", "id", "rainUsername", "verified") SELECT "discordId", "discordUsername", "id", "rainUsername", "verified" FROM "UserVerification";
DROP TABLE "UserVerification";
ALTER TABLE "new_UserVerification" RENAME TO "UserVerification";
CREATE UNIQUE INDEX "UserVerification_discordId_key" ON "UserVerification"("discordId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
