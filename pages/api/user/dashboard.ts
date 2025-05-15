import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  // Debug logging
  console.log("Session user.id:", session?.user?.id);

  if (!session?.user?.id) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    // Ensure discordId is a string
    const discordId = String(session.user.id);
    console.log("Querying for discordId:", discordId);
    const user = await prisma.userVerification.findUnique({
      where: { discordId },
    });
    console.log("User found:", user);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ rainUsername: user.rainUsername });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
