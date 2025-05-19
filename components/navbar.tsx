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
import { Menu, X, User, LogOut, Settings } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // For demo purposes

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8 border border-purple-500/50">
                    <AvatarImage src="/placeholder.svg" alt="@username" />
                    <AvatarFallback className="bg-purple-900 text-white">MS</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">username</p>
                    <p className="text-xs leading-none text-muted-foreground">Measter Coins: 250</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="ghost"
                className="text-white hover:text-white hover:bg-gray-800"
                onClick={() => setIsLoggedIn(true)}
              >
                Login
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0">
                Register
              </Button>
            </div>
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
                    setIsLoggedIn(true)
                    setIsOpen(false)
                  }}
                >
                  Login
                </Button>
                <Button className="w-full justify-center bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0">
                  Register
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
