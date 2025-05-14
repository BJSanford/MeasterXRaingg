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
      setError(err.message || "An error occurred. Please try again.");
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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-gray-800 bg-gray-900/80 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Account Linking</CardTitle>
            <CardDescription className="text-gray-400">
              Link your Rain.gg account with Discord
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4 rounded bg-red-900/40 p-2 text-center text-red-300"
              >
                {error}
              </motion.div>
            )}
            <div className="mb-4 text-center">
              <p className="text-gray-300">
                Rain.gg Username: <span className="font-bold">{rainUsername}</span>
              </p>
              <p className="text-gray-300">
                Discord Username: <span className="font-bold">{session?.user?.name}</span>
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mb-4"
            >
              <Button
                onClick={startVerification}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
              >
                Start Verification
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mb-4"
            >
              <Button
                onClick={checkVerificationStatus}
                className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800"
                disabled={isChecking}
              >
                {isChecking ? "Checking..." : "Check Verification Status"}
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => router.push("/login")}
                className="w-full bg-gray-700 hover:bg-gray-600"
              >
                Go Back to Login
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
