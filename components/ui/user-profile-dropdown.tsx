"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Menu, Transition } from "@headlessui/react"
import { cn } from "@/lib/utils"
import { ChevronDown, User, LogOut, ExternalLink } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import Cookies from "js-cookie"

interface UserProfileDropdownProps {
  username: string
  avatarUrl?: string
  rainUsername?: string | null
  onSignOut?: () => void
}

const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({
  username,
  avatarUrl,
  rainUsername: propRainUsername,
  onSignOut,
}) => {
  const [discordAvatar, setDiscordAvatar] = useState<string | null>(null)
  const [rainUsername, setRainUsername] = useState<string | null>(null)
  const [verified, setVerified] = useState<boolean>(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { logout } = useAuth()

  // Load Discord avatar and Rain.gg info from localStorage and cookies
  useEffect(() => {
    setDiscordAvatar(localStorage.getItem("discordAvatar"))
    setRainUsername(Cookies.get("rainUsername") || null)
    setVerified(Cookies.get("verified") === "true")

    // Listen for cookie changes (e.g., after verification)
    const handleStorage = () => {
      setRainUsername(Cookies.get("rainUsername") || null)
      setVerified(Cookies.get("verified") === "true")
    }
    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  // Refresh rainUsername/verified when menu opens (in case user just verified)
  const handleMenuOpen = () => {
    setMenuOpen(true)
    setRainUsername(Cookies.get("rainUsername") || null)
    setVerified(Cookies.get("verified") === "true")
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <Menu.Button
            className="group flex items-center space-x-3 px-3 py-2 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/60 hover:border-gray-600/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-black"
            onClick={handleMenuOpen}
          >
            <div className="relative">
              {discordAvatar ? (
                <img
                  src={discordAvatar || "/placeholder.svg"}
                  alt="User Avatar"
                  className="h-8 w-8 rounded-full object-cover ring-2 ring-gray-600/50 group-hover:ring-purple-500/50 transition-all duration-300"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 ring-2 ring-gray-600/50 group-hover:ring-purple-500/50 transition-all duration-300">
                  <span className="text-xs font-semibold text-white">{username.charAt(0).toUpperCase()}</span>
                </div>
              )}
              {verified && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800 animate-pulse" />
              )}
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors duration-200">
                {username}
              </span>
              {rainUsername && (
                <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-200">
                  Rain.gg: {rainUsername}
                </span>
              )}
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-gray-400 group-hover:text-purple-300 transition-all duration-300",
                open && "rotate-180",
              )}
            />
          </Menu.Button>

          {menuOpen && (
            <Transition
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95 translate-y-[-10px]"
              enterTo="transform opacity-100 scale-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="transform opacity-100 scale-100 translate-y-0"
              leaveTo="transform opacity-0 scale-95 translate-y-[-10px]"
            >
              <Menu.Items className="absolute right-0 mt-3 w-64 origin-top-right rounded-2xl bg-white/95 backdrop-blur-xl shadow-2xl ring-1 ring-black/10 focus:outline-none overflow-hidden">
                <div className="p-1">
                  {/* User Info Header */}
                  <div className="px-4 py-3 border-b border-gray-200/50">
                    <div className="flex items-center space-x-3">
                      {discordAvatar ? (
                        <img
                          src={discordAvatar || "/placeholder.svg"}
                          alt="User Avatar"
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-cyan-500">
                          <span className="text-sm font-semibold text-white">{username.charAt(0).toUpperCase()}</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{username}</p>
                        {rainUsername && verified ? (
                          <p className="text-xs text-green-600 flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            Connected to Rain.gg
                          </p>
                        ) : (
                          <p className="text-xs text-gray-500">Not connected to Rain.gg</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    {rainUsername && verified ? (
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/dashboard"
                            className={cn(
                              "group flex items-center px-4 py-3 text-sm font-medium rounded-xl mx-1 transition-all duration-200",
                              active
                                ? "bg-gradient-to-r from-purple-500/10 to-cyan-500/10 text-purple-700 transform scale-[1.02]"
                                : "text-gray-700 hover:bg-gray-50",
                            )}
                          >
                            <User
                              className={cn(
                                "mr-3 h-4 w-4 transition-colors duration-200",
                                active ? "text-purple-600" : "text-gray-400",
                              )}
                            />
                            Rain.gg Dashboard
                            <ExternalLink
                              className={cn(
                                "ml-auto h-3 w-3 transition-all duration-200",
                                active ? "text-purple-500 translate-x-1" : "text-gray-400",
                              )}
                            />
                          </a>
                        )}
                      </Menu.Item>
                    ) : (
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/auth/link"
                            className={cn(
                              "group flex items-center px-4 py-3 text-sm font-semibold rounded-xl mx-1 transition-all duration-200",
                              active
                                ? "bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-purple-700 transform scale-[1.02]"
                                : "text-purple-600 hover:bg-purple-50",
                            )}
                          >
                            <div
                              className={cn(
                                "mr-3 h-4 w-4 rounded-full border-2 transition-all duration-200",
                                active ? "border-purple-600 bg-purple-100" : "border-purple-400",
                              )}
                            />
                            Link Rain.gg Account
                            <ExternalLink
                              className={cn(
                                "ml-auto h-3 w-3 transition-all duration-200",
                                active ? "text-purple-600 translate-x-1" : "text-purple-400",
                              )}
                            />
                          </a>
                        )}
                      </Menu.Item>
                    )}

                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => {
                            if (onSignOut) {
                              onSignOut()
                            }
                            // Close dropdown
                            setMenuOpen(false)

                            // Use logout function from auth-context
                            logout()
                          }}
                          className={cn(
                            "group flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl mx-1 transition-all duration-200",
                            active ? "bg-red-50 text-red-700 transform scale-[1.02]" : "text-red-600 hover:bg-red-50",
                          )}
                        >
                          <LogOut
                            className={cn(
                              "mr-3 h-4 w-4 transition-all duration-200",
                              active ? "text-red-600 -translate-x-1" : "text-red-500",
                            )}
                          />
                          Sign Out
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </div>
              </Menu.Items>
            </Transition>
          )}
        </>
      )}
    </Menu>
  )
}

export default UserProfileDropdown
