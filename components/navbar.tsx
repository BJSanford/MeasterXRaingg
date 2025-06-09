"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, X } from "lucide-react"
import { useSession, signIn, signOut } from "next-auth/react"
import UserProfileDropdown from "@/components/ui/user-profile-dropdown"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session, status } = useSession()
  const isLoggedIn = status === "authenticated"
  const rainUsername = typeof window !== 'undefined' ? localStorage.getItem("rainUsername") : null

  // No Discord avatar in session, so use undefined (UserProfileDropdown will fallback to initials)
  const avatarUrl: string | undefined = undefined

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600"></div>
              <div className="absolute inset-0.5 rounded-full bg-black flex items-center justify-center text-white font-bold">
                M
              </div>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
              MeasterSkins
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium text-white hover:text-purple-400 transition-colors">
            Home
          </Link>
          <Link href="/leaderboard" className="text-sm font-medium text-white hover:text-purple-400 transition-colors">
            Leaderboard
          </Link>
          <Link href="/rewards" className="text-sm font-medium text-white hover:text-purple-400 transition-colors">
            Rewards
          </Link>
          <Link href="/giveaways" className="text-sm font-medium text-white hover:text-purple-400 transition-colors">
            Giveaways
          </Link>
          <Link href="/about" className="text-sm font-medium text-white hover:text-purple-400 transition-colors">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <UserProfileDropdown
              username={session.user.name}
              avatarUrl={avatarUrl}
              rainUsername={rainUsername}
              onSignOut={() => signOut()}
            />
          ) : (
            <Button
              variant="ghost"
              className="text-white hover:text-white hover:bg-gray-800"
              onClick={() => signIn("discord")}
            >
              Login with Discord
            </Button>
          )}

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <Link
              href="/"
              className="block py-2 text-base font-medium text-white hover:text-purple-400"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/leaderboard"
              className="block py-2 text-base font-medium text-white hover:text-purple-400"
              onClick={() => setIsOpen(false)}
            >
              Leaderboard
            </Link>
            <Link
              href="/rewards"
              className="block py-2 text-base font-medium text-white hover:text-purple-400"
              onClick={() => setIsOpen(false)}
            >
              Rewards
            </Link>
            <Link
              href="/giveaways"
              className="block py-2 text-base font-medium text-white hover:text-purple-400"
              onClick={() => setIsOpen(false)}
            >
              Giveaways
            </Link>
            <Link
              href="/about"
              className="block py-2 text-base font-medium text-white hover:text-purple-400"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            {!isLoggedIn && (
              <div className="flex flex-col gap-2 pt-2">
                <Button
                  variant="outline"
                  className="w-full justify-center"
                  onClick={() => {
                    signIn("discord")
                    setIsOpen(false)
                  }}
                >
                  Login with Discord
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
