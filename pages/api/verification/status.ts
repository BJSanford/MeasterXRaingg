import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end();

  const { discordId } = req.query;

  if (!discordId || typeof discordId !== "string") {
    return res.status(400).json({ error: "Discord ID is required" });
  }

  try {
    const user = await prisma.userVerification.findUnique({
      where: { discordId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ verified: user.verified });
  } catch (error) {
    console.error("Error checking verification status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
