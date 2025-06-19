import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import axios from "axios";
import { API_BASE_URL } from "../../../lib/server-api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Incoming request payload:", req.body);

  if (req.method === "POST") {
    const { rainId, rakebackAmount } = req.body;
    const discordId = req.cookies.discordId || req.body.discordId;
    const rainUsername = req.cookies.rainUsername || req.body.rainUsername;

    if (!rainId || !discordId || !rainUsername || !rakebackAmount || typeof rakebackAmount !== "number") {
      return res.status(400).json({ error: "Invalid request data" });
    }

    try {
      // Check if the rakeback has already been claimed
      const existingClaim = await prisma.activeRakeback.findFirst({
        where: {
          userId: parseInt(discordId),
          activeRakeback: rakebackAmount,
        },
      });

      if (!existingClaim || existingClaim.activeRakeback < rakebackAmount) {
        return res.status(400).json({ error: "Insufficient rakeback to claim" });
      }

      // Update rakeback as claimed
      await prisma.activeRakeback.update({
        where: { userId: parseInt(discordId) },
        data: {
          activeRakeback: 0,
          redeemableRakeback: 0,
          lastRedeemedDate: new Date(),
        },
      });

      // Notify the Discord bot
      const botEndpoint = `${process.env.API_BASE_URL}discord/rakebackClaim`;

      console.log("Bot endpoint:", botEndpoint);
      console.log("Payload sent to bot:", { discordId, rainId, rakebackAmount });

      try {
        const botResponse = await axios.post(botEndpoint, {
          discordId,
          rainId,
          rainUsername,
          rakebackAmount,
        });

        console.log("Bot response:", botResponse.data);
        res.status(200).json({ success: true, rainId });
      } catch (error) {
        console.error("Error sending request to bot endpoint:", error);
        res.status(500).json({ error: "Failed to notify bot." });
      }
    } catch (error) {
      console.error("Error processing rakeback claim:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
