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
      session,
      status,
      rainUsername,
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
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Linking your accounts...</h2>
        <p>Please wait...</p>
        {/* Always show debug info */}
        <pre className="mt-4 text-left text-xs bg-gray-900 p-2 rounded">
          {JSON.stringify(debug, null, 2)}
        </pre>
      </div>
    </div>
  )
}
