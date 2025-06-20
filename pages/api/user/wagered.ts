import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const username = req.query.username;
    if (!username || typeof username !== "string") {
      return res.status(400).json({ error: "Missing username" });
    }
    try {
      // Fetch the all-time wagered leaderboard from Rain.gg
      const url = `https://api.rain.gg/v1/affiliates/leaderboard?start_date=2024-01-01T00%3A00%3A00.00Z&end_date=2026-01-01T00%3A00%3A00.00Z&type=wagered`;
      const response = await fetch(url, {
        headers: {
          accept: "application/json",
          "x-api-key": process.env.RAIN_API_KEY || "",
        },
      });
      if (!response.ok) {
        return res.status(500).json({ error: "Failed to fetch wagered leaderboard" });
      }
      const data = await response.json();
      const arr = Array.isArray(data.results)
        ? data.results
        : Array.isArray(data.leaderboard)
        ? data.leaderboard
        : [];
      const user = arr.find((u: any) =>
        typeof u.username === "string" &&
        u.username.trim().toLowerCase() === username.trim().toLowerCase()
      );
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
