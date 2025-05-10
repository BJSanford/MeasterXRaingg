"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export const dynamic = "force-dynamic"

export default function LinkAccountPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [timedOut, setTimedOut] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    let timeout: NodeJS.Timeout | null = setTimeout(() => {
      setTimedOut(true)
      setLoading(false)
    }, 10000)

    // Dynamically import next-auth/react and useSession only on client
    import("next-auth/react").then(({ useSession, signOut }) => {
      // Use a temporary component to get session
      function SessionGetter({ onSession }: { onSession: (session: any, status: string) => void }) {
        const { data: session, status } = useSession()
        useEffect(() => {
          if (status !== "loading") {
            onSession(session, status)
          }
        }, [session, status])
        return null
      }

      // Render SessionGetter in a portal-like way
      const div = document.createElement("div")
      document.body.appendChild(div)
      const onSession = (session: any, status: string) => {
        if (status === "loading") return
        const rainUsername = sessionStorage.getItem("pendingRainUsername")
        if (!rainUsername) {
          setError("No Rain.gg username found. Please start the login process again.")
          setLoading(false)
          signOut({ callbackUrl: "/login" })
          if (timeout) clearTimeout(timeout)
          return
        }
        if (!session?.user?.id) {
          setError("No Discord user found. Please try again.")
          setLoading(false)
          signOut({ callbackUrl: "/login" })
          if (timeout) clearTimeout(timeout)
          return
        }
        // Link Discord and Rain.gg username
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
            if (timeout) clearTimeout(timeout)
            if (!res.ok) throw new Error("Failed to link accounts")
            sessionStorage.removeItem("pendingRainUsername")
            setLoading(false)
            router.replace("/dashboard")
          })
          .catch(() => {
            if (timeout) clearTimeout(timeout)
            setError("Failed to link accounts. Please try again.")
            setLoading(false)
            signOut({ callbackUrl: "/login" })
          })
      }
      // Render SessionGetter
      import("react-dom").then(({ render, unmountComponentAtNode }) => {
        render(<SessionGetter onSession={onSession} />, div)
        // Clean up after a while
        setTimeout(() => {
          unmountComponentAtNode(div)
          document.body.removeChild(div)
        }, 5000)
      })
    })

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [mounted, router])

  if (!mounted) return null

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
