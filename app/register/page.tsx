"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <div className="text-center p-8 bg-gray-800 rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-extrabold mb-6">Register / Verify</h1>
        <p className="text-lg mb-4 text-gray-400">
          Please make sure you are in MeasterCS_Skins discord. If you are, please wait to be @ed in a channel, then provide proof of ownership of your Rain.gg account.
        </p>
        {error && <p className="mb-4 text-red-400">{error}</p>}
        <input
          type="text"
          value={rainUsername}
          onChange={(e) => setRainUsername(e.target.value)}
          placeholder="Enter your Rain.gg username"
          className="mb-4 w-full max-w-sm px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleRegister}
          className="btn-primary w-full max-w-sm mx-auto"
        >
          Start Verification
        </button>
      </div>
    </div>
  );
}
