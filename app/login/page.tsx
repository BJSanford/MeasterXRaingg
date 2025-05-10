"use client"

import { useState } from "react"
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

  // Handle login with Rain.gg username
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    try {
      if (!rainUsername.trim()) {
        setError("Please enter your Rain.gg username")
        setIsLoading(false)
        return
      }
      const userData = await verifyUser(rainUsername.trim())
      if (!userData) {
        setError("Username not found in MEASTER community")
        setIsLoading(false)
        return
      }
      localStorage.setItem("rainUsername", userData.username)
      document.cookie = `rainUsername=${encodeURIComponent(userData.username)}; path=/; max-age=604800`
      await login(userData.username)
      window.location.href = "/dashboard"
      return
    } catch {
      setError("An error occurred during login. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Demo login
  const handleDemoLogin = async () => {
    setIsLoading(true)
    setError(null)
    try {
      await login("demo-user")
      router.push("/dashboard")
    } catch {
      setError("An error occurred during demo login. Please try again.")
    } finally {
      setIsLoading(false)
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
              <CardTitle className="text-2xl font-bold mb-2">Sign In to MEASTER</CardTitle>
              <div className="text-gray-400 text-sm mb-2">Access your dashboard and rewards</div>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="mb-4 rounded bg-red-900/40 p-2 text-red-300 text-center text-sm">{error}</div>
              )}
              <form onSubmit={handleLogin} className="mb-4">
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
                  {isLoading ? "Signing in..." : "Access Dashboard"}
                </Button>
              </form>
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-700"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-gray-900 px-2 text-gray-400">Or</span>
                </div>
              </div>
              <Button
                onClick={() => signIn("discord", { callbackUrl: `/auth/callback?rainUsername=${encodeURIComponent(rainUsername)}` })}
                className="w-full bg-[#5865F2] text-white hover:bg-[#4752C4] mb-3"
                disabled={isLoading}
                type="button"
              >
                Sign in with Discord
              </Button>
              <Button
                onClick={handleDemoLogin}
                className="w-full bg-gray-800 text-gray-200 hover:bg-gray-700"
                disabled={isLoading}
                type="button"
                variant="outline"
              >
                Try Demo Account
              </Button>
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