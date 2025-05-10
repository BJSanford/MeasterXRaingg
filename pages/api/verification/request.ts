import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { discordId, discordUsername, rainUsername } = req.body;
  if (!discordId || !discordUsername || !rainUsername) {
    return res.status(400).json({ error: "Missing fields" });
  }
  try {
    await prisma.userVerification.upsert({
      where: { discordId },
      update: { rainUsername, discordUsername },
      create: {
        discordId,
        discordUsername,
        rainUsername,
        verified: false,
      },
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Verification request error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}