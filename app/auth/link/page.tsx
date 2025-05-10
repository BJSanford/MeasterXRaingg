"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export const dynamic = "force-dynamic"

export default function LinkAccountPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [timedOut, setTimedOut] = useState(false)
  const [fetchStarted, setFetchStarted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    let timeout: NodeJS.Timeout
    let isMounted = true

    // Only run on client
    if (typeof window === "undefined" || fetchStarted) return

    setFetchStarted(true)
    timeout = setTimeout(() => {
      if (isMounted) {
        setTimedOut(true)
        setLoading(false)
      }
    }, 10000)

    // Dynamically import useSession and signOut only on client
    import("next-auth/react").then(({ useSession, signOut }) => {
      // Use a temporary component to get session
      function TempSession() {
        const { data: session, status } = useSession()
        useEffect(() => {
          if (status !== "authenticated") return
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
        }, [session, status])
        return null
      }
      // Render TempSession in a hidden div
      const div = document.createElement("div")
      document.body.appendChild(div)
      import("react-dom").then(({ render, unmountComponentAtNode }) => {
        render(<TempSession />, div)
        // Cleanup
        return () => {
          unmountComponentAtNode(div)
          document.body.removeChild(div)
        }
      })
    })

    return () => {
      isMounted = false
      clearTimeout(timeout)
    }
  }, [fetchStarted, router])

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
