import { useState } from "react";

export default function VerificationPage() {
  const [rainUsername, setRainUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function submitVerification(discordId: string, discordUsername: string, rainUsername: string) {
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/verification/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ discordId, discordUsername, rainUsername }),
      });
      if (!res.ok) {
        setError("Verification request failed");
        // Optionally log to console as well
        console.error("Verification request failed");
      } else {
        setSuccess("Verification request submitted!");
        console.log("Verification request submitted");
      }
    } catch (err) {
      setError("Error submitting verification request");
      console.error("Error submitting verification request:", err);
    }
  }

  // Call submitVerification() after user signs in with Discord and provides Rain.gg username

  return (
    <div>
      <h1>Verification</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {success && <div style={{ color: "green" }}>{success}</div>}
      <input
        type="text"
        value={rainUsername}
        onChange={(e) => setRainUsername(e.target.value)}
        placeholder="Enter your Rain.gg username"
      />
      <button
        onClick={() => {
          // TODO: Replace with actual Discord ID and username from authenticated user
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