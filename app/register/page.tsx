"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [rainUsername, setRainUsername] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleRegister() {
    if (!rainUsername.trim()) {
      setError("Please enter your Rain.gg username.");
      return;
    }

    try {
      // Store Rain.gg username in sessionStorage
      sessionStorage.setItem("pendingRainUsername", rainUsername.trim());

      // Redirect to Discord login
      await signIn("discord", { callbackUrl: "/auth/link" });
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Register / Verify</h1>
        {error && <p className="mb-4 text-red-400">{error}</p>}
        <input
          type="text"
          value={rainUsername}
          onChange={(e) => setRainUsername(e.target.value)}
          placeholder="Enter your Rain.gg username"
          className="mb-4 px-4 py-2 border rounded"
        />
        <button
          onClick={handleRegister}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Register / Verify
        </button>
      </div>
    </div>
  );
}
