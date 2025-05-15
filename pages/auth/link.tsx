import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function LinkAccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [rainUsername, setRainUsername] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    if (status === "loading") return;

    const storedRainUsername = sessionStorage.getItem("pendingRainUsername");
    setRainUsername(storedRainUsername);

    if (!storedRainUsername) {
      setError("No Rain.gg username found. Please start the login process again.");
      return;
    }

    if (!session?.user?.id || !session?.user?.name) {
      setError("No Discord user information found. Please try again.");
      return;
    }
  }, [session, status]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/verification/status?discordId=${session?.user?.id}`);
        const data = await res.json();

        if (data.verified) {
          clearInterval(interval);
          router.push("/login");
        }
      } catch (err) {
        console.error("Error checking verification status:", err);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [session, router]);

  async function startVerification() {
    setError(null);
    try {
      const res = await fetch("/api/verification/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          discordId: session?.user?.id,
          discordUsername: session?.user?.name,
          rainUsername,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to start verification. Please try again.");
      }

      alert("Verification request sent! Please check Discord for further instructions.");
    } catch (err) {
      setError((err as Error).message || "An error occurred. Please try again.");
    }
  }

  async function checkVerificationStatus() {
    setIsChecking(true);
    setError(null);

    try {
      const res = await fetch(`/api/verification/status?discordId=${session?.user?.id}`);
      const data = await res.json();

      if (data.verified) {
        console.log("✅ User is verified. Redirecting to dashboard...");
        router.push("/dashboard"); // Redirect to the dashboard if verified
      } else {
        setError("Your account is not verified yet. Please wait for a moderator to approve.");
      }
    } catch (err) {
      console.error("🔴 Error checking verification status:", err);
      setError("Failed to check verification status. Please try again.");
    } finally {
      setIsChecking(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <div className="text-center p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Link Your Account</h1>
        <p className="mb-4 text-gray-300">
          Please make sure you are in MeasterCS_Skins Discord. If you are, please wait to be @ed in a channel, then provide proof of ownership of your Rain.gg account.
        </p>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          className="btn-primary w-full max-w-sm mx-auto mb-4"
          onClick={startVerification}
        >
          Start Verification
        </button>
      </div>
    </div>
  );
}
