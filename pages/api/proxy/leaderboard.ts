import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { start_date, end_date, type } = req.query;

  if (!start_date || !end_date || !type) {
    return res.status(400).json({ error: "Missing required query parameters." });
  }

  const API_BASE_URL = "https://api.rain.gg/v1/affiliates/leaderboard";
  const API_KEY = process.env.RAIN_API_KEY || "14d2ae5d-cea5-453a-b814-6fd810bda580";

  try {
    const response = await fetch(
      `${API_BASE_URL}?start_date=${start_date}&end_date=${end_date}&type=${type}`,
      {
        headers: {
          accept: "application/json",
          "x-api-key": API_KEY,
        },
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch leaderboard data." });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}
