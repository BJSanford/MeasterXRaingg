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