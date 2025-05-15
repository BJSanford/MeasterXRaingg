import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  // Debug logging
  console.log("Full session object:", session);
  console.log("Session user.id:", session?.user?.id);
  console.log("Session user.name:", session?.user?.name);

  if (!session?.user?.id && !session?.user?.name) {
    return res.status(401).json({ error: "Not authenticated: No Discord ID or username in session." });
  }

  try {
    // Try to find by Discord ID first
    let user = null;
    if (session.user.id) {
      const discordId = String(session.user.id);
      console.log("Querying for discordId:", discordId);
      user = await prisma.userVerification.findUnique({
        where: { discordId },
      });
    }
    // Fallback: Try to find by Discord username if not found by ID
    if (!user && session.user.name) {
      const discordUsername = String(session.user.name);
      console.log("Fallback: Querying for discordUsername:", discordUsername);
      user = await prisma.userVerification.findFirst({
        where: { discordUsername },
      });
    }
    console.log("User found:", user);

    if (!user) {
      return res.status(404).json({ error: "User not found in UserVerification table for this Discord ID or username." });
    }

    // Return the full user object for frontend use
    res.status(200).json({
      id: user.id,
      discordId: user.discordId,
      discordUsername: user.discordUsername,
      rainUsername: user.rainUsername,
      verified: user.verified,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
