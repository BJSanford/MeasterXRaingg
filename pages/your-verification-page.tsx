import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { discordId, discordUsername, rainUsername } = req.body;

  console.log("Received verification request:", req.body);

  if (!discordId || !rainUsername || !discordUsername) {
    console.error("Missing required fields:", req.body);
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Upsert verification request
    await prisma.userVerification.upsert({
      where: { discordId },
      update: { rainUsername, discordUsername, verified: false },
      create: { discordId, discordUsername, rainUsername, verified: false },
    });
    console.log("Verification request saved for:", discordId);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error saving verification request:", error);
    res.status(500).json({ error: "Database error" });
  }
}

// New file: pages/your-verification-page.tsx

import { useState } from "react";

export default function VerificationPage() {
  const [rainUsername, setRainUsername] = useState("");

  async function submitVerification(discordId: string, discordUsername: string, rainUsername: string) {
    try {
      const res = await fetch("/api/verification/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ discordId, discordUsername, rainUsername }),
      });
      if (!res.ok) {
        // Handle error
        console.error("Verification request failed");
      } else {
        // Success logic
        console.log("Verification request submitted");
      }
    } catch (err) {
      console.error("Error submitting verification request:", err);
    }
  }

  // Call submitVerification() after user signs in with Discord and provides Rain.gg username

  return (
    <div>
      <h1>Verification</h1>
      <input
        type="text"
        value={rainUsername}
        onChange={(e) => setRainUsername(e.target.value)}
        placeholder="Enter your Rain.gg username"
      />
      <button
        onClick={() => {
          // Replace with actual Discord ID and username
          const discordId = "user-discord-id";
          const discordUsername = "user-discord-username";
          submitVerification(discordId, discordUsername, rainUsername);
        }}
      >
        Verify
      </button>
    </div>
  );
}