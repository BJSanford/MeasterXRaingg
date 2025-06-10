import { NextApiRequest, NextApiResponse } from "next";
import { fetchLeaderboard } from "@/lib/server-api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // In a real app, get the username from session/auth
    const username = req.query.username || "Player123";
    try {
      // Fetch the wagered leaderboard from Rain.gg
      const leaderboard = await fetchLeaderboard("wagered");
      const user = leaderboard.results.find((u) => u.username === username);
      const wagered = user ? user.wagered : 0;
      res.status(200).json({ wagered });
    } catch (e) {
      res.status(500).json({ error: "Failed to fetch wagered amount" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
