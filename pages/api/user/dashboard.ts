import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { PrismaClient } from "@prisma/client";
import { verifyUser } from "../../../lib/server-api";

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
    // Always use discordUsername for lookup if user.id is missing
    let user = null;
    if (session.user.id) {
      const discordId = String(session.user.id);
      user = await prisma.userVerification.findUnique({
        where: { discordId },
      });
    }
    if (!user && session.user.name) {
      const discordUsername = String(session.user.name);
      user = await prisma.userVerification.findFirst({
        where: { discordUsername },
      });
    }
    if (!user) {
      return res.status(404).json({ error: "User not found in UserVerification table for this Discord ID or username." });
    }
    // Always return discordUsername for frontend cookie
    // Fetch Rain.gg user data to get avatar URLs
    const rainData = await verifyUser(user.rainUsername);
    // Choose small avatar URL for client
    const avatarUrl = rainData?.avatar?.small || "";
    res.status(200).json({
      rainUsername: user.rainUsername,
      discordUsername: user.discordUsername,
      verified: user.verified,
      avatarUrl,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
