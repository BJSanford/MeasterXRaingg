import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    const pendingVerifications = await prisma.userVerification.findMany({
      where: {
        verified: false,
        discordId: { not: null }, // Ensure discordId is not null
        discordUsername: { not: null }, // Ensure discordUsername is not null
      },
      select: {
        discordId: true,
        discordUsername: true,
        rainUsername: true,
      },
    });

    res.status(200).json(pendingVerifications);
  } catch (error: any) {
    console.error("Error fetching pending verifications:", error.message);
    res.status(500).json({ error: "Database error", details: error.message });
  }
}
