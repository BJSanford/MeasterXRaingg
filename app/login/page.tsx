"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth-context"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Info } from "lucide-react"
import CityOverlay from "../city-overlay"
import SnowOverlay from "../snow-overlay"
import { fadeIn, staggerContainer } from "@/lib/animation-utils"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [userId, setUserId] = useState("")

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      if (!userId.trim()) {
        setError("Please enter your username")
        toast({
          title: "Login failed",
          description: "Please enter your username",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      const userData = await verifyUser(userId.trim())
      if (!userData) {
        setError("Username not found in MEASTER community")
        toast({
          title: "Login failed",
          description: "Username not found in MEASTER community",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      await login(userData.id)
      toast({
        title: "Login successful",
        description: "Welcome to the MEASTER community!",
      })
      router.push("/dashboard")
    } catch (error) {
      setError("An error occurred during login. Please try again.")
      toast({
        title: "Login error",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle demo login
  const handleDemoLogin = async () => {
    setIsLoading(true)
    setError(null)

    try {
      await login("demo-user")
      toast({
        title: "Demo login successful",
        description: "You are now viewing a demo account",
      })
      router.push("/dashboard")
    } catch (error) {
      setError("An error occurred during demo login. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <CityOverlay />
      <SnowOverlay />

      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative border-b border-gray-800 bg-black/80 backdrop-blur-sm"
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-auto items-center text-lg font-bold">
                <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  RAIN.GG
                </span>
              </div>
              <span className="text-sm text-gray-400">×</span>
              <span className="text-sm text-gray-400">Code MEASTER</span>
            </Link>
          </motion.div>
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ y: -2 }}>
              <Link href="/" className="text-sm text-gray-400 hover:text-white">
                Home
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }}>
              <Link href="/leaderboard" className="text-sm text-gray-400 hover:text-white">
                Leaderboard
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }}>
              <Link href="/socials" className="text-sm text-gray-400 hover:text-white">
                Socials
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <main className="flex flex-1 items-center justify-center p-4">
        <motion.div variants={staggerContainer()} initial="hidden" animate="show" className="w-full max-w-md">
          <motion.div variants={fadeIn("up", 0.2)}>
            <Card className="mx-auto w-full border-gray-800 bg-gray-900/70 text-white backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Access Your Dashboard</CardTitle>
                <CardDescription>Enter your user ID to view your MEASTER benefits</CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <Alert className="mb-4 border-red-800 bg-red-900/20 text-red-400">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}

                <motion.div variants={fadeIn("up", 0.3)}>
                  <Alert className="mb-4 border-blue-800 bg-blue-900/20 text-blue-400">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Information</AlertTitle>
                    <AlertDescription>
                      Your user ID is provided by Rain.gg when you register with code MEASTER. If you don't have one
                      yet, you can try the demo account.
                    </AlertDescription>
                  </Alert>
                </motion.div>

                <motion.form variants={fadeIn("up", 0.4)} onSubmit={handleLogin} className="mb-4">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="userId">Rain.gg Username</Label>
                      <Input
                        id="userId"
                        placeholder="Enter your Rain.gg username"
                        type="text"
                        autoCapitalize="none"
                        autoCorrect="off"
                        className="border-gray-700 bg-gray-800 text-white"
                        required
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                      />
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 text-black hover:from-yellow-600 hover:to-amber-600"
                        disabled={isLoading}
                      >
                        {isLoading ? "Signing in..." : "Access Dashboard"}
                      </Button>
                    </motion.div>
                  </div>
                </motion.form>

                <motion.div variants={fadeIn("up", 0.5)}>
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-gray-700"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-gray-900 px-2 text-gray-400">Or</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={fadeIn("up", 0.6)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={handleDemoLogin}
                    variant="outline"
                    className="w-full border-gray-700 text-white hover:bg-gray-800"
                    disabled={isLoading}
                  >
                    Try Demo Account
                  </Button>
                </motion.div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <motion.div variants={fadeIn("up", 0.7)} className="mt-4 text-center text-sm text-gray-400">
                  <p>
                    By continuing, you agree to our{" "}
                    <Link href="#" className="underline hover:text-white">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="underline hover:text-white">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}