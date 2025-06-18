import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Incoming request payload:", req.body);

  if (req.method === "POST") {
    const { rainUsername, rewardAmount } = req.body;
    const discordId = req.cookies.discordId || req.body.discordId;

    if (!rainUsername || !discordId || !rewardAmount || typeof rewardAmount !== "number") {
      return res.status(400).json({ error: "Invalid request data" });
    }

    try {
      // Fetch Rain ID dynamically using rainUsername
      const leaderboardResponse = await axios.get(`${process.env.API_BASE_URL}/affiliates/leaderboard=deposited`, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.RAIN_API_KEY,
        },
      });

      const leaderboardUser = leaderboardResponse.data.results.find(
        (user: any) => user.username === rainUsername
      );

      if (!leaderboardUser) {
        return res.status(404).json({ error: "Rain username not found in leaderboard" });
      }

      const rainId = leaderboardUser.id;

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
      const botEndpoint = `${process.env.API_BASE_URL}/discord/rankRewardClaim`.replace(/\/discord\/discord\//, '/discord/');

      console.log("Bot endpoint:", botEndpoint);
      console.log("Payload sent to bot:", { discordId, rainId, rewardAmount });

      await axios.post(botEndpoint, {
        discordId,
        rainId,
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
