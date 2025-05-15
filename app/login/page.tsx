"use client"

import { useState } from "react"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import CityOverlay from "../city-overlay"
import SnowOverlay from "../snow-overlay"

export default function LoginPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // After sign-in, check for associated Rain.gg username
  async function handleDiscordLogin() {
    setError(null)
    setLoading(true)
    try {
      const res = await signIn("discord", { redirect: false })
      if (res?.error) {
        setError("Failed to sign in with Discord.")
        setLoading(false)
        return
      }
      // Wait for session to update
      setTimeout(async () => {
        const sessionRes = await fetch("/api/user/dashboard")
        const data = await sessionRes.json()
        if (data.rainUsername) {
          // Store rainUsername for dashboard usage
          localStorage.setItem("rainUsername", data.rainUsername)
          router.push("/dashboard")
        } else {
          setError("No Rain.gg account linked to this Discord. Please register first.")
        }
        setLoading(false)
      }, 1000)
    } catch (err) {
      setError("An error occurred. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <CityOverlay />
      <SnowOverlay />
      <main className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-6">Dashboard Login</h1>
          {error && <div className="mb-4 text-red-400">{error}</div>}
          <Button
            onClick={handleDiscordLogin}
            className="w-full bg-[#5865F2] text-white hover:bg-[#4752C4]"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in with Discord"}
          </Button>
        </div>
      </main>
    </div>
  )
}