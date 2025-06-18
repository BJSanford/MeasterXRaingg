import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function LinkAccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [rainUsername, setRainUsername] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [verificationStarted, setVerificationStarted] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    // Try to get from sessionStorage if available
    const storedRainUsername = sessionStorage.getItem("pendingRainUsername");
    if (storedRainUsername) {
      setRainUsername(storedRainUsername);
    }
  }, [status]);

  useEffect(() => {
    if (!verificationStarted) return;
    // Poll for verification status every 15s after starting verification
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/verification/status?discordId=${session?.user?.id}`);
        const data = await res.json();
        if (data.verified) {
          clearInterval(interval);
          router.push("/login");
        }
      } catch (err) {
        // Ignore polling errors
      }
    }, 15000);
    return () => clearInterval(interval);
  }, [verificationStarted, session, router]);

  async function startVerification() {
    setError(null);
    if (!rainUsername.trim()) {
      setError("Please enter your Rain.gg username.");
      return;
    }
    try {
      setVerificationStarted(true);
      const res = await fetch("/api/verification/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          discordId: session?.user?.id,
          discordUsername: session?.user?.name,
          rainUsername: rainUsername.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to start verification. Please try again.");
      }
      // Save for future
      sessionStorage.setItem("pendingRainUsername", rainUsername.trim());
      alert("Verification request sent! Please check Discord for further instructions.");
    } catch (err) {
      setError((err as Error).message || "An error occurred. Please try again.");
      setVerificationStarted(false);
    }
  }

  async function checkVerificationStatus() {
    setIsChecking(true);
    setError(null);
    try {
      const res = await fetch(`/api/verification/status?discordId=${session?.user?.id}`);
      const data = await res.json();
      if (data.verified) {
        // Fetch latest user info and update localStorage
        const dashRes = await fetch("/api/user/dashboard");
        if (dashRes.ok) {
          const dashData = await dashRes.json();
          if (dashData.rainUsername) {
            localStorage.setItem("rainUsername", dashData.rainUsername);
            localStorage.setItem("discordUsername", dashData.discordUsername);
            localStorage.setItem("verified", dashData.verified ? "true" : "false");
            document.cookie = `discordUsername=${dashData.discordUsername}; path=/`;
            document.cookie = `rainUsername=${dashData.rainUsername}; path=/`;
            document.cookie = `verified=${dashData.verified ? "true" : "false"}; path=/`;
          }
        }
        router.push("/dashboard");
      } else {
        setError("Your account is not verified yet. Please wait for a moderator to approve.");
      }
    } catch (err) {
      setError("Failed to check verification status. Please try again.");
    } finally {
      setIsChecking(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <div className="text-center p-8 bg-gray-800 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-6">Link Your Account</h1>
        <p className="mb-4 text-gray-300">
          Please make sure you are in MeasterRewards Discord. If you are, please wait to be @ed in a channel, then provide proof of ownership of your Rain.gg account.
        </p>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          value={rainUsername}
          onChange={(e) => setRainUsername(e.target.value)}
          placeholder="Enter your Rain.gg username"
          className="mb-4 w-full max-w-sm px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
        />
        <button
          className="btn-primary w-full max-w-sm mx-auto mb-4"
          onClick={startVerification}
          disabled={verificationStarted}
        >
          {verificationStarted ? "Verification Requested" : "Start Verification"}
        </button>
        <button
          className="w-full max-w-sm mx-auto border border-gray-600 rounded-lg px-4 py-2 text-gray-200 bg-gray-700 hover:bg-gray-600"
          onClick={checkVerificationStatus}
          disabled={isChecking}
        >
          {isChecking ? "Checking..." : "Check Verification Status"}
        </button>
      </div>
    </div>
  );
}
