// WEEKLY RACE LEADERBOARD API ROUTE
// This API route proxies the /affiliates/races endpoint for the weekly race leaderboard.
// For all-time/custom leaderboards, use /api/proxy/leaderboard instead.

import { NextApiRequest, NextApiResponse } from "next";

const PRIZE_DISTRIBUTION = [700, 350, 200, 100, 75, 50, 15, 10]; // Hardcoded prize distribution
const PRIZE_POOL = PRIZE_DISTRIBUTION.reduce((a, b) => a + b, 0);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch("https://api.rain.gg/v1/affiliates/races?participant_count=50", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.RAIN_API_KEY, // Ensure the API key is passed
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch leaderboard data:", response.statusText);
      return res.status(500).json({
        error: "Failed to fetch leaderboard data. Please try again later.",
        leaderboard: [],
        startDate: null,
        endDate: null,
        prizePool: PRIZE_POOL,
      });
    }

    const data = await response.json();
    const race = data.results?.[0]; // Safely access the first race

    if (!race) {
      console.error("No race data available in the API response.");
      return res.status(500).json({
        error: "No race data available. Please try again later.",
        leaderboard: [],
        startDate: null,
        endDate: null,
        prizePool: PRIZE_POOL,
      });
    }

    const leaderboard = race.participants?.map((participant: any, index: number) => ({
      username: participant.username,
      avatar: participant.avatar?.medium || "/placeholder.svg",
      wagered: participant.wagered,
      prize: PRIZE_DISTRIBUTION[index] || 0, // Ensure correct prize assignment
    })) || [];

    res.status(200).json({
      startDate: race.starts_at,
      endDate: race.ends_at,
      prizePool: PRIZE_POOL,
      leaderboard,
    });
  } catch (error) {
    console.error("Unexpected error fetching leaderboard data:", error);
    res.status(500).json({ error: "An unexpected error occurred. Please try again later." });
  }
}
