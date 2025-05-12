"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function LinkAccountPage() {
  const router = useRouter();
  const sessionHook = useSession(); // Use the hook directly
  const session = sessionHook?.data; // Safely access session data
  const status = sessionHook?.status;seState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);
    if (status === "loading") return;
  useEffect(() => {
    if (status === "loading") return;ge.getItem("pendingRainUsername");
    if (!rainUsername) {
    console.log("Session data:", session); // Debugging session datass again.");
Url: "/login" });
    const rainUsername = sessionStorage.getItem("pendingRainUsername");
    if (!rainUsername) {
      setError("No Rain.gg username found. Please start the login process again.");
      signOut({ callbackUrl: "/login" });f (!session?.user?.id || !session?.user?.name) {
      return;      setError("No Discord user information found. Please try again.");
    }

    if (!session?.user?.id || !session?.user?.name) {
      setError("No Discord user information found. Please try again.");
      signOut({ callbackUrl: "/login" });/ Automatically post the data
      return;    postVerification(session.user.id, session.user.name, rainUsername);
    }

    // Automatically post the dataification(discordId: string, discordUsername: string, rainUsername: string) {
    postVerification(session.user.id, session.user.name, rainUsername);    setIsPosting(true);
  }, [session, status]);

  async function postVerification(discordId: string, discordUsername: string, rainUsername: string) {
    setIsPosting(true);      const res = await fetch("/api/verification/request", {
    setError(null);ethod: "POST",

    try {ngify({ discordId, discordUsername, rainUsername }),
      const res = await fetch("/api/verification/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },(!res.ok) {
        body: JSON.stringify({ discordId, discordUsername, rainUsername }),        const data = await res.json();
      });ror(data.error || "Failed to link accounts");

      if (!res.ok) {
        const data = await res.json();essionStorage.removeItem("pendingRainUsername");
        throw new Error(data.error || "Failed to link accounts");      router.replace("/dashboard");
      }
verification:", err);
      sessionStorage.removeItem("pendingRainUsername");ge || "An error occurred while linking accounts.");
      router.replace("/dashboard");
    } catch (err: any) {
      console.error("Error posting verification:", err);
      setError(err.message || "An error occurred while linking accounts.");
    } finally {
      setIsPosting(false);f (error) {
    }    return (
  }ssName="flex min-h-screen items-center justify-center bg-black text-white">
 className="text-center">
  if (error) {
    return (</p>
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">backUrl: "/login" })}
          <h2 className="text-2xl font-bold mb-4">Account Linking Error</h2>Name="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          <p className="mb-4">{error}</p>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}/button>
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Go Back to Login
          </button>
        </div>
      </div>eturn (
    );    <div className="flex min-h-screen items-center justify-center bg-black text-white">
  } className="text-center">

  return (k your Discord and Rain.gg accounts.</p>
    <div className="flex min-h-screen items-center justify-center bg-black text-white">ormation...</p>}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Linking your accounts...</h2>
        <p>Please wait while we link your Discord and Rain.gg accounts.</p>
        {isPosting && <p className="mt-4 text-yellow-400">Submitting your information...</p>}
      </div>    </div>  );
}
