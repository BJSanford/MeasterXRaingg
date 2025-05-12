"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function LinkAccountPage() {
  const router = useRouter();
  const sessionHook = typeof window !== "undefined" ? useSession() : null;
  const session = sessionHook?.data;
  const status = sessionHook?.status;

  const [error, setError] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);
  const [rainUsername, setRainUsername] = useState<string | null>(null);

  useEffect(() => {
    if (!session || status === "loading") return;

    const storedRainUsername = sessionStorage.getItem("pendingRainUsername");
    setRainUsername(storedRainUsername);

    console.log("Stored Rain.gg username:", storedRainUsername);
    console.log("🔵 SESSION DATA IN FRONTEND:", session);

    if (!storedRainUsername) {
      setError("No Rain.gg username found. Please start the login process again.");
      return;
    }

    if (!session?.user?.id || !session?.user?.name) {
      setError("No Discord user information found. Please try again.");
      return;
    }
  }, [session, status]);

  async function postVerification(discordId: string, discordUsername: string, rainUsername: string) {
    setIsPosting(true);
    setError(null);

    try {
      const res = await fetch("/api/verification/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ discordId, discordUsername, rainUsername }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to link accounts");
      }

      sessionStorage.removeItem("pendingRainUsername");
      router.replace("/dashboard");
    } catch (err: any) {
      console.error("Error posting verification:", err);
      setError(err.message || "An error occurred while linking accounts.");
    } finally {
      setIsPosting(false);
    }
  }

  async function postRainUsernameOnly(rainUsername: string) {
    setIsPosting(true);
    setError(null);

    try {
      const res = await fetch("/api/verification/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rainUsername }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to post Rain.gg username.");
      }

      console.log("Successfully posted Rain.gg username:", rainUsername);
    } catch (err: any) {
      console.error("Error posting Rain.gg username:", err);
      setError(err.message || "An error occurred while posting Rain.gg username.");
    } finally {
      setIsPosting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Link Your Accounts</h2>
        {error && <p className="mb-4 text-red-400">{error}</p>}
        {rainUsername && (
          <p className="mb-4">
            Rain.gg Username: <span className="font-bold">{rainUsername}</span>
          </p>
        )}
        {session?.user?.id && session?.user?.name && (
          <p className="mb-4">
            Discord ID: <span className="font-bold">{session.user.id}</span>
            <br />
            Discord Username: <span className="font-bold">{session.user.name}</span>
          </p>
        )}
        <div className="flex flex-col gap-4">
          <button
            onClick={() =>
              session?.user?.id && session?.user?.name && rainUsername
                ? postVerification(session.user.id, session.user.name, rainUsername)
                : setError("Missing required data to post verification.")
            }
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={isPosting}
          >
            Post Verification (Full Data)
          </button>
          <button
            onClick={() => rainUsername && postRainUsernameOnly(rainUsername)}
            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
            disabled={isPosting}
          >
            Post Rain.gg Username Only (Test)
          </button>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Go Back to Login
          </button>
        </div>
        {isPosting && <p className="mt-4 text-yellow-400">Submitting your information...</p>}
      </div>
    </div>
  );
}
