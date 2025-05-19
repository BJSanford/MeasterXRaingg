import { NextApiRequest, NextApiResponse } from "next";

const PRIZE_DISTRIBUTION = [500, 250, 150, 50, 20, 15, 10, 5]; // Top 8 prizes
const PRIZE_POOL = PRIZE_DISTRIBUTION.reduce((a, b) => a + b, 0);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch("https://api.rain.gg/v1/affiliates/races?participant_count=50", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch leaderboard data");
    }

    const data = await response.json();
    const race = data.results[0]; // Assuming the first race is the active one

    const leaderboard = race.participants.map((participant: any, index: number) => ({
      username: participant.username,
      avatar: participant.avatar?.medium || "/placeholder.svg",
      wagered: participant.wagered,
      prize: PRIZE_DISTRIBUTION[index] || 0,
    }));

    res.status(200).json({
      startDate: race.starts_at,
      endDate: race.ends_at,
      prizePool: PRIZE_POOL,
      leaderboard,
    });
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    res.status(500).json({ error: "Failed to fetch leaderboard data" });
  }
}
