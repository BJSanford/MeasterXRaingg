"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"

export const dynamic = "force-dynamic"

export default function LinkAccountPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [timedOut, setTimedOut] = useState(false)

  // Prevent SSR/prerender crash: only run effect on client
  useEffect(() => {
    if (typeof window === "undefined") return
    if (status === "loading") return

    const timeout = setTimeout(() => {
      setTimedOut(true)
      setLoading(false)
    }, 10000)

    const rainUsername = sessionStorage.getItem("pendingRainUsername")
    if (!rainUsername) {
      setError("No Rain.gg username found. Please start the login process again.")
      setLoading(false)
      signOut({ callbackUrl: "/login" })
      clearTimeout(timeout)
      return
    }

    if (!session?.user?.id) {
      setError("No Discord user found. Please try again.")
      setLoading(false)
      signOut({ callbackUrl: "/login" })
      clearTimeout(timeout)
      return
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
        clearTimeout(timeout)
        if (!res.ok) throw new Error("Failed to link accounts")
        sessionStorage.removeItem("pendingRainUsername")
        setLoading(false)
        router.replace("/dashboard")
      })
      .catch(() => {
        clearTimeout(timeout)
        setError("Failed to link accounts. Please try again.")
        setLoading(false)
        signOut({ callbackUrl: "/login" })
      })

    return () => clearTimeout(timeout)
  }, [session, status, router])

  // Render nothing on server
  if (typeof window === "undefined") return null

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Account Linking Error</h2>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  if (timedOut) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Linking Timeout</h2>
          <p>Linking your accounts is taking too long. Please try again later.</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Linking your accounts...</h2>
          <p>Please wait...</p>
        </div>
      </div>
    )
  }

  return null
}
