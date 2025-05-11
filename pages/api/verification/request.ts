import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { discordId, discordUsername, rainUsername } = req.body;

  if (!discordId || !rainUsername || !discordUsername) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Upsert verification request
    await prisma.userVerification.upsert({
      where: { discordId },
      update: { rainUsername, discordUsername, verified: false },
      create: { discordId, discordUsername, rainUsername, verified: false },
    });

    // Optionally: Notify Discord bot (webhook, etc.)
    // ...existing code...

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error in /api/verification/request:", error);
    res.status(500).json({ error: "Internal server error", details: error instanceof Error ? error.message : error });
  }
}