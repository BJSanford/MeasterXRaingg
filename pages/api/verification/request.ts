import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { discordId, discordUsername, rainUsername } = req.body;

  console.log("Received verification request:", req.body);

  if (!rainUsername) {
    console.error("Rain.gg username is required:", req.body);
    return res.status(400).json({ error: "Rain.gg username is required" });
  }

  try {
    if (discordId && discordUsername) {
      // Handle full verification request with Discord data
      await prisma.userVerification.upsert({
        where: { discordId },
        update: { rainUsername, discordUsername, verified: false },
        create: { discordId, discordUsername, rainUsername, verified: false },
      });
      console.log("Verification request saved for Discord ID:", discordId);
    } else {
      // Handle request with only Rain.gg username
      console.log("Processing request with only Rain.gg username:", rainUsername);
      // You can add additional logic here if needed
    }

    res.status(200).json({ success: true });
  } catch (error: any) {
    console.error("Error saving verification request:", error.message, error.stack);
    res.status(500).json({ error: "Database error", details: error.message });
  }
}