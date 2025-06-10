"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import UserProfileDropdown from "@/components/ui/user-profile-dropdown";

interface NavbarProps {
  session: any; // Accept session as a prop
}

export function Navbar({ session }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = !!session;
  const rainUsername = typeof window !== "undefined" ? localStorage.getItem("rainUsername") : null;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
              avatarUrl={session.user.image}
              rainUsername={rainUsername}
              onSignOut={() => window.location.href = "/api/auth/signout"} // Redirect to signout
            />
          ) : (
            <Button
              variant="ghost"
              className="text-white hover:text-white hover:bg-gray-800"
              onClick={() => window.location.href = "/login"} // Redirect to /login
            >
              Login with Discord
            </Button>
          )}

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden focus:outline-none focus:ring-2 focus:ring-purple-500" onClick={toggleMenu} aria-label="Toggle menu">
            <span className="sr-only">Toggle menu</span>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
        <nav className="md:hidden bg-black/95 backdrop-blur-lg border-t border-gray-800 px-4 py-4 space-y-2 animate-fade-in-down">
          <Link href="/" className="block py-2 text-base font-medium text-white hover:text-purple-400 rounded transition-colors" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link href="/leaderboard" className="block py-2 text-base font-medium text-white hover:text-purple-400 rounded transition-colors" onClick={() => setIsOpen(false)}>
            Leaderboard
          </Link>
          <Link href="/rewards" className="block py-2 text-base font-medium text-white hover:text-purple-400 rounded transition-colors" onClick={() => setIsOpen(false)}>
            Rewards
          </Link>
          <Link href="/giveaways" className="block py-2 text-base font-medium text-white hover:text-purple-400 rounded transition-colors" onClick={() => setIsOpen(false)}>
            Giveaways
          </Link>
          <Link href="/about" className="block py-2 text-base font-medium text-white hover:text-purple-400 rounded transition-colors" onClick={() => setIsOpen(false)}>
            About
          </Link>
          {/* Add login/logout button for mobile if needed */}
        </nav>
      )}
    </header>
  );
}
