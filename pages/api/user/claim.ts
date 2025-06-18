import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import axios from "axios";
import { API_BASE_URL } from "../../../lib/server-api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Incoming request payload:", req.body);

  if (req.method === "POST") {
    const { rainId, rewardAmount } = req.body;
    const discordId = req.cookies.discordId || req.body.discordId;

    if (!rainId || !discordId || !rewardAmount || typeof rewardAmount !== "number") {
      return res.status(400).json({ error: "Invalid request data" });
    }

    try {
      // Check if the reward has already been claimed
      const existingClaim = await prisma.rankRewardClaim.findFirst({
        where: { rainId, rewardAmount },
      });

      if (existingClaim) {
        return res.status(400).json({ error: "Reward already claimed" });
      }

      // Mark the reward as claimed
      await prisma.rankRewardClaim.create({
        data: { rainId, rewardAmount },
      });

      // Notify the Discord bot
      const botEndpoint = `${process.env.API_BASE_URL}/discord/rankRewardClaim`;

      console.log("Bot endpoint:", botEndpoint);
      console.log("Payload sent to bot:", { discordId, rainId, rewardAmount });

      try {
        const botResponse = await axios.post(botEndpoint, {
          discordId,
          rainId,
          rewardAmount,
        });

        console.log("Bot response:", botResponse.data);
        res.status(200).json({ success: true, rainId });
      } catch (error) {
        console.error("Error sending request to bot endpoint:", error);
        res.status(500).json({ error: "Failed to notify bot." });
      }
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
