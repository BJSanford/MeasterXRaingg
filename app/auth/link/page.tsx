"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"

export default function LinkAccountPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [error, setError] = useState<string | null>(null)
  const [isPosting, setIsPosting] = useState(false)

  useEffect(() => {
    if (status === "loading") return

    const rainUsername = sessionStorage.getItem("pendingRainUsername")
    if (!rainUsername) {
      setError("No Rain.gg username found. Please start the login process again.")
      signOut({ callbackUrl: "/login" })
      return
    }

    if (!session?.user?.id || !session?.user?.name) {
      setError("No Discord user information found. Please try again.")
      signOut({ callbackUrl: "/login" })
      return
    }

    // Automatically post the data
    postVerification(session.user.id, session.user.name, rainUsername)
  }, [session, status])

  async function postVerification(discordId: string, discordUsername: string, rainUsername: string) {
    setIsPosting(true)
    setError(null)

    try {
      const res = await fetch("/api/verification/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ discordId, discordUsername, rainUsername }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to link accounts")
      }

      sessionStorage.removeItem("pendingRainUsername")
      router.replace("/dashboard")
    } catch (err: any) {
      console.error("Error posting verification:", err)
      setError(err.message || "An error occurred while linking accounts.")
    } finally {
      setIsPosting(false)
    }
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Account Linking Error</h2>
          <p className="mb-4">{error}</p>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Go Back to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Linking your accounts...</h2>
        <p>Please wait while we link your Discord and Rain.gg accounts.</p>
        {isPosting && <p className="mt-4 text-yellow-400">Submitting your information...</p>}
      </div>
    </div>
  )
}
