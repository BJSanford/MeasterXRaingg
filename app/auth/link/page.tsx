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
      const res = await fetch("/api/verification/request", {Id, discordUsername, rainUsername });
        method: "POST",
        headers: { "Content-Type": "application/json" },", {
        body: JSON.stringify({ discordId, discordUsername, rainUsername }),
      });eaders: { "Content-Type": "application/json" },
        body: JSON.stringify({ discordId, discordUsername, rainUsername }),
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to link accounts");
      }
      if (!res.ok) {
      sessionStorage.removeItem("pendingRainUsername");
      router.replace("/dashboard");ponse:", data);
    } catch (err: any) {data.error || "Failed to link accounts.");
      console.error("Error posting verification:", err);
      setError(err.message || "An error occurred while linking accounts.");
    } finally {og("✅ Successfully posted verification data:", { discordId, discordUsername, rainUsername });
      setIsPosting(false);
    } sessionStorage.removeItem("pendingRainUsername");
  }   router.replace("/dashboard");
    } catch (err: any) {
  async function postRainUsernameOnly(rainUsername: string) {r);
    setIsPosting(true);age || "An error occurred while linking accounts.");
    setError(null);
      setIsPosting(false);
    try {
      const res = await fetch("/api/verification/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },ng) {", {
        body: JSON.stringify({ rainUsername }),
      });ror(null);eaders: { "Content-Type": "application/json" },
        body: JSON.stringify({ rainUsername }),
      if (!res.ok) {
        const data = await res.json();rification/request", {
        throw new Error(data.error || "Failed to post Rain.gg username.");
      } headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rainUsername }),      if (!res.ok) {
      console.log("Successfully posted Rain.gg username:", rainUsername);
    } catch (err: any) {;
      console.error("Error posting Rain.gg username:", err);
      setError(err.message || "An error occurred while posting Rain.gg username.");
    } finally {ew Error(data.error || "Failed to post Rain.gg username.");
      setIsPosting(false);.gg username:", rainUsername);
    }h (err: any) {
  }   console.log("Successfully posted Rain.gg username:", rainUsername);   console.error("🔴 Error posting Rain.gg username:", err);
    } catch (err: any) {      setError(err.message || "An error occurred while posting Rain.gg username.");
  return (ole.error("Error posting Rain.gg username:", err);lly {
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Link Your Accounts</h2>
        {error && <p className="mb-4 text-red-400">{error}</p>}
        {rainUsername && (
          <p className="mb-4">enter bg-black text-white">
            Rain.gg Username: <span className="font-bold">{rainUsername}</span>
          </p>Name="flex min-h-screen items-center justify-center bg-black text-white">assName="text-2xl font-bold mb-4">Link Your Accounts</h2>
        )} className="text-center">rror && <p className="mb-4 text-red-400">{error}</p>}
        {session?.user?.id && session?.user?.name && (our Accounts</h2>
          <p className="mb-4">="mb-4 text-red-400">{error}</p>}
            Discord ID: <span className="font-bold">{session.user.id}</span>
            <br />Name="mb-4">
            Discord Username: <span className="font-bold">{session.user.name}</span>
          </p>on?.user?.id && session?.user?.name && (
        )}<p className="mb-4">
        <div className="flex flex-col gap-4">name && (-bold">{session.user.id}</span>
          <buttonsName="mb-4">>
            onClick={() =>pan className="font-bold">{session.user.id}</span>me: <span className="font-bold">{session.user.name}</span>
              session?.user?.id && session?.user?.name && rainUsername
                ? postVerification(session.user.id, session.user.name, rainUsername)
                : setError("Missing required data to post verification.")
            }n
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={isPosting}r?.name && rainUsername
          > onClick={() =>     ? postVerification(session.user.id, session.user.name, rainUsername)
            Post Verification (Full Data)n?.user?.name && rainUsernamered data to post verification.")
          </button>ostVerification(session.user.id, session.user.name, rainUsername)
          <button setError("Missing required data to post verification.")Name="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => {
              if (rainUsername) {
                console.log("🔵 Triggering postRainUsernameOnly with:", rainUsername);ull Data)
                postRainUsernameOnly(rainUsername);/button>
              } else {
                setError("Rain.gg username is missing.");={() => rainUsername && postRainUsernameOnly(rainUsername)}
              }Name="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
            }}y(rainUsername)}
            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"w-700"
            disabled={isPosting} disabled={isPosting} Post Rain.gg Username Only (Test)
          >
            Post Rain.gg Username Only (Test)in.gg Username Only (Test)
          </button>tton>Click={() => signOut({ callbackUrl: "/login" })}
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}onClick={() => signOut({ callbackUrl: "/login" })}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"  Go Back to Login
          >      >      </button>
            Go Back to Login           Go Back to Login       </div>
          </button>          </button>        {isPosting && <p className="mt-4 text-yellow-400">Submitting your information...</p>}







}  );    </div>      </div>        {isPosting && <p className="mt-4 text-yellow-400">Submitting your information...</p>}        </div>






}  );    </div>      </div>        {isPosting && <p className="mt-4 text-yellow-400">Submitting your information...</p>}        </div>      </div>
    </div>
  );
}
