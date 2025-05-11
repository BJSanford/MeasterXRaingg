"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"

// Prevent static prerendering
export const dynamic = "force-dynamic"

export default function LinkAccountPage() {
  const router = useRouter()
  const sessionHook = typeof window !== "undefined" ? useSession() : undefined
  const session = sessionHook?.data
  const status = sessionHook?.status
  const [error, setError] = useState<string | null>(null)
  const [debug, setDebug] = useState<any>(null) // <-- Add debug state

  useEffect(() => {
    if (!sessionHook) return
    if (status === "loading") return

    const rainUsername = sessionStorage.getItem("pendingRainUsername")
    setDebug({
      session: session ?? "NO_SESSION",
      status,
      rainUsername: rainUsername ?? "NO_RAIN_USERNAME",
    }) // <-- Set debug info

    if (!rainUsername) {
      setError("No Rain.gg username found. Please start the login process again.")
      signOut({ callbackUrl: "/login" })
      return
    }

    if (!session?.user?.id) {
      setError("No Discord user found. Please try again.")
      signOut({ callbackUrl: "/login" })
      return
    }

    // Add logging here
    console.log("Linking accounts:", {
      discordId: session.user.id,
      discordUsername: session.user.name,
      rainUsername,
    })

    // DEBUG: Add a guard to prevent double POSTs
    if (window.__linkingRequestSent) return;
    window.__linkingRequestSent = true;

    fetch("/api/verification/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        discordId: session.user.id,
        discordUsername: session.user.name,
        rainUsername,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to link accounts")
        // Success: clear sessionStorage and redirect
        sessionStorage.removeItem("pendingRainUsername")
        router.replace("/dashboard")
      })
      .catch((err) => {
        console.error("Linking error:", err)
        setError("Failed to link accounts. Please try again.")
        signOut({ callbackUrl: "/login" })
      })
  }, [session, status, router, sessionHook])

  // Add a manual trigger button for debugging
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Account Linking Error</h2>
          <p>{error}</p>
          {debug && (
            <pre className="mt-4 text-left text-xs bg-gray-900 p-2 rounded">
              {JSON.stringify(debug, null, 2)}
            </pre>
          )}
          <button
            style={{ marginTop: 16, padding: 8, background: "#333", color: "#fff", borderRadius: 4 }}
            onClick={() => {
              const rainUsername = sessionStorage.getItem("pendingRainUsername");
              if (!session?.user?.id || !rainUsername) {
                alert("Missing Discord user or Rain.gg username");
                return;
              }
              fetch("/api/verification/request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  discordId: session.user.id,
                  discordUsername: session.user.name,
                  rainUsername,
                }),
              })
                .then((res) => {
                  if (!res.ok) throw new Error("Failed to link accounts")
                  sessionStorage.removeItem("pendingRainUsername")
                  router.replace("/dashboard")
                })
                .catch((err) => {
                  alert("Manual POST failed: " + err.message)
                });
            }}
          >
            Try POST manually
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Linking your accounts...</h2>
        <p>Please wait...</p>
        <pre className="mt-4 text-left text-xs bg-gray-900 p-2 rounded">
          {debug
            ? JSON.stringify(debug, null, 2)
            : "Waiting for session and username..."}
        </pre>
      </div>
    </div>
  )
}
