-- CreateTable
CREATE TABLE "UserVerification" (
    "id" SERIAL NOT NULL,
    "discordId" TEXT NOT NULL,
    "discordUsername" TEXT NOT NULL,
    "rainUsername" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL,

    CONSTRAINT "UserVerification_pkey" PRIMARY KEY ("id")
);
