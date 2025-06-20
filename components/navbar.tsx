"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DiscordLoginButton } from "@/components/ui/discord-login-button"
import UserProfileDropdown from "@/components/ui/user-profile-dropdown"
import { Home, Trophy, Gift } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

interface NavbarProps {
  session?: any
}

export function Navbar({ session: initialSession }: NavbarProps) {
  const { logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [session, setSession] = useState(initialSession)
  const [rainUsername, setRainUsername] = useState<string | null>(null)

  useEffect(() => {
    // Get rainUsername from localStorage on client side
    if (typeof window !== "undefined") {
      const storedUsername = localStorage.getItem("rainUsername")
      setRainUsername(storedUsername)
    }
  }, [])

  const isLoggedIn = !!session?.user

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleSignOut = () => {
    logout()
    setSession(null) // Ensure session state is cleared
  }

  const handleLogin = () => {
    if (typeof window !== "undefined") {
      window.location.href = "/login" // Redirect to /login page
    }
  }

  const handleJoinCs2 = () => {
    if (typeof window !== "undefined") {
      window.location.href = 'steam://connect/169.155.120.84:26940'
    }
  }

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
    { name: "Rewards", href: "/rewards", icon: Gift },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-3 group">
            {/* Updated the logo to display within a circular frame */}
            <img
              src="/images/measter-logo.png"
              alt="MeasterCS Logo"
              className="w-10 h-10 rounded-full transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:from-purple-300 group-hover:to-cyan-300 transition-all duration-300">
              MeasterRewards
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-center items-center space-x-2">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.name} href={item.href}>
                <div className="group relative px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105">
                  {/* Background gradient */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Border gradient */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-[1px]">
                    <div className="w-full h-full rounded-lg bg-black/80"></div>
                  </div>

                  {/* Content */}
                  <div className="relative flex items-center gap-2 text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                    <Icon className="w-4 h-4 group-hover:text-purple-400 transition-colors duration-300" />
                    <span className="group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all duration-300">
                      {item.name}
                    </span>
                  </div>

                  {/* Shine effect */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300"></div>
                </div>
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <UserProfileDropdown
              username={session.user.name || "User"}
              avatarUrl={session.user.image || "/placeholder.svg?height=32&width=32"}
              rainUsername={rainUsername}
              onSignOut={handleSignOut}
            />
          ) : (
            <DiscordLoginButton onClick={handleLogin} />
          )}
          
          {/* Join CS2 button, smaller and right-aligned */}
          <button
            onClick={handleJoinCs2}
            className="hidden md:inline-flex ml-4 px-2 py-0.5 bg-gradient-to-r from-purple-600 to-cyan-600 text-xs text-white font-semibold rounded-full shadow transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            JOIN CS2 VIEWER GAME SERVER
          </button>
          
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden focus:outline-none focus:ring-2 focus:ring-purple-500 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-cyan-600/20"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className="sr-only">Toggle menu</span>
            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden bg-black/95 backdrop-blur-lg border-t border-gray-800 px-4 py-4 space-y-3 animate-fade-in-down">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.name} href={item.href} className="group block" onClick={() => setIsOpen(false)}>
                <div className="relative px-4 py-3 rounded-lg transition-all duration-300 hover:scale-[1.02]">
                  {/* Background gradient */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Border gradient */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-[1px]">
                    <div className="w-full h-full rounded-lg bg-black/80"></div>
                  </div>

                  {/* Content */}
                  <div className="relative flex items-center gap-3 text-base font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                    <Icon className="w-5 h-5 group-hover:text-purple-400 transition-colors duration-300" />
                    <span className="group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all duration-300">
                      {item.name}
                    </span>
                  </div>

                  {/* Shine effect */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300"></div>
                </div>
              </Link>
            )
          })}

          {/* Mobile login button - only show when not logged in */}
          {!isLoggedIn && (
            <div className="pt-2">
              <DiscordLoginButton onClick={handleLogin} className="w-full" />
            </div>
          )}
        </nav>
      )}
    </header>
  )
}
