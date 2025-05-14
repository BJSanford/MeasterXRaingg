import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { discordId } = req.body;

  console.log("🔵 Approving verification for Discord ID:", discordId);

  if (!discordId) {
    console.error("🔴 Discord ID is required");
    return res.status(400).json({ error: "Discord ID is required" });
  }

  try {
    const user = await prisma.userVerification.update({
      where: { discordId },
      data: { verified: true },
    });

    console.log("✅ User verified:", user);
    res.status(200).json({ success: true, rainUsername: user.rainUsername });
  } catch (error: any) {
    console.error("🔴 Error approving user:", error.message, error.stack);
    res.status(500).json({ error: "Database error", details: error.message });
  }
}
