import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Incoming request payload:", req.body);

  if (req.method === "POST") {
    const { rainUsername, discordId, rewardAmount } = req.body;

    console.log("Received payload:", req.body);
    console.log("rainUsername:", req.body.rainUsername);
    console.log("discordId:", req.body.discordId);
    console.log("rewardAmount:", req.body.rewardAmount);

    if (!rainUsername || !discordId || !rewardAmount || typeof rewardAmount !== "number") {
      return res.status(400).json({ error: "Invalid request data" });
    }

    try {
      // Check if the reward has already been claimed
      const existingClaim = await prisma.rankRewardClaim.findFirst({
        where: { rainUsername, rewardAmount },
      });

      if (existingClaim) {
        return res.status(400).json({ error: "Reward already claimed" });
      }

      // Mark the reward as claimed
      await prisma.rankRewardClaim.create({
        data: { rainUsername, rewardAmount },
      });

      // Notify the Discord bot
      const botEndpoint = process.env.API_BASE_URL
        ? `${process.env.API_BASE_URL}/discord/rankRewardClaim`
        : "http://localhost:3000/discord/rankRewardClaim";

      if (!process.env.API_BASE_URL) {
        console.warn("API_BASE_URL is not defined. Using fallback URL: http://localhost:3000/discord/rankRewardClaim");
      }

      await axios.post(botEndpoint, {
        discordId,
        rainUsername,
        rewardAmount,
      });

      res.status(200).json({ message: "Reward claimed successfully!" });
    } catch (error) {
      console.error("Error processing claim:", error);
      console.error("Error details:", error.response?.data || error.message || error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
