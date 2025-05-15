"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth-context"
import { verifyUser } from "@/lib/server-api"
import { signIn } from "next-auth/react"
import CityOverlay from "../city-overlay"
import SnowOverlay from "../snow-overlay"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rainUsername, setRainUsername] = useState("")
  const [step, setStep] = useState<"username" | "discord">("username")

  // On mount, clear any stored username
  useEffect(() => {
    sessionStorage.removeItem("pendingRainUsername")
  }, [])

  // Step 1: User enters Rain.gg username
  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!rainUsername.trim()) {
      setError("Please enter your Rain.gg username")
      return
    }
    // Store username for after Discord OAuth
    sessionStorage.setItem("pendingRainUsername", rainUsername.trim())
    setStep("discord")
  }

  // Step 2: User clicks Discord login
  const handleDiscordLogin = async () => {
    try {
      const res = await signIn("discord", { redirect: false });
      if (res?.error) {
        setError("Failed to log in. Please try again.");
        return;
      }

      // Fetch the Rain.gg username associated with the Discord ID
      const response = await fetch("/api/user/dashboard");
      const data = await response.json();

      if (data.rainUsername) {
        router.push("/dashboard");
      } else {
        setError("No Rain.gg account found for this Discord ID. Please register first.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <CityOverlay />
      <SnowOverlay />
      <main className="flex flex-1 items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Card className="mx-auto w-full border-gray-800 bg-gray-900/80 text-white shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold mb-2">Secure Login</CardTitle>
              <div className="text-gray-400 text-sm mb-2">Step {step === "username" ? "1" : "2"} of 2</div>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="mb-4 rounded bg-red-900/40 p-2 text-red-300 text-center text-sm">{error}</div>
              )}
              {step === "username" && (
                <form onSubmit={handleUsernameSubmit} className="mb-4">
                  <Input
                    id="rainUsername"
                    placeholder="Rain.gg Username"
                    type="text"
                    autoCapitalize="none"
                    autoCorrect="off"
                    className="border-gray-700 bg-gray-800 text-white mb-3"
                    required
                    value={rainUsername}
                    onChange={(e) => setRainUsername(e.target.value)}
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 text-black hover:from-yellow-600 hover:to-amber-600"
                    disabled={isLoading}
                  >
                    Continue
                  </Button>
                </form>
              )}
              {step === "discord" && (
                <div className="flex flex-col gap-4">
                  <div className="mb-2 text-center text-gray-300">
                    Rain.gg username: <span className="font-bold">{rainUsername}</span>
                  </div>
                  <Button
                    onClick={handleDiscordLogin}
                    className="w-full bg-[#5865F2] text-white hover:bg-[#4752C4]"
                    disabled={isLoading}
                    type="button"
                  >
                    Sign in with Discord
                  </Button>
                  <Button
                    onClick={() => setStep("username")}
                    className="w-full bg-gray-800 text-gray-200 hover:bg-gray-700"
                    disabled={isLoading}
                    type="button"
                    variant="outline"
                  >
                    Back
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col gap-2 text-center text-xs text-gray-500">
              <span>
                Don&apos;t have a Rain.gg account?{" "}
                <a
                  href="https://rain.gg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-400 hover:text-blue-300"
                >
                  Register here
                </a>
              </span>
              <span>
                By continuing, you agree to our{" "}
                <Link href="https://rain.gg/terms" className="underline hover:text-white" target="_blank">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="https://rain.gg/privacy" className="underline hover:text-white" target="_blank">
                  Privacy Policy
                </Link>
                .
              </span>
            </CardFooter>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}