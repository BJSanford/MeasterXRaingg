import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import axios from "axios";
import { API_BASE_URL } from "../../../lib/server-api";

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
      console.log("Fetching leaderboard data for Rain ID...");
      console.log("Request URL:", `${API_BASE_URL}/affiliates/leaderboard?start_date=2020-01-01T00%3A00%3A00.00Z&end_date=2029-01-01T00%3A00%3A00.00Z&type=deposited`);
      const leaderboardResponse = await axios.get(`${API_BASE_URL}/affiliates/leaderboard?start_date=2020-01-01T00%3A00%3A00.00Z&end_date=2029-01-01T00%3A00%3A00.00Z&type=deposited`, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.RAIN_API_KEY,
        },
      });

      console.log("Leaderboard API response:", leaderboardResponse.data);
      const leaderboardUser = leaderboardResponse.data.results.find(
        (user: any) => user.username === rainUsername
      );

      if (leaderboardUser && leaderboardUser.id) {
        const rainId = leaderboardUser.id;
        console.log("Rain ID successfully extracted:", rainId);

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

        res.status(200).json({ success: true, rainId });
      } else {
        console.error("Rain username not found or Rain ID missing in leaderboard response.");
        res.status(404).json({ error: "Rain username not found in leaderboard" });
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
