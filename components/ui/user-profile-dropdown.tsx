"use client";

import React, { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";

interface UserProfileDropdownProps {
  username: string;
  avatarUrl?: string;
  rainUsername?: string | null;
  onSignOut?: () => void;
}

const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({
  username,
  avatarUrl,
  rainUsername: propRainUsername,
  onSignOut,
}) => {
  const [discordAvatar, setDiscordAvatar] = useState<string | null>(null);
  const [rainUsername, setRainUsername] = useState<string | null>(null);
  const [verified, setVerified] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Load Discord avatar and Rain.gg info from localStorage
  useEffect(() => {
    setDiscordAvatar(localStorage.getItem("discordAvatar"));
    setRainUsername(localStorage.getItem("rainUsername"));
    setVerified(localStorage.getItem("verified") === "true");

    // Listen for localStorage changes (e.g., after verification)
    const handleStorage = () => {
      setRainUsername(localStorage.getItem("rainUsername"));
      setVerified(localStorage.getItem("verified") === "true");
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Refresh rainUsername/verified when menu opens (in case user just verified)
  const handleMenuOpen = () => {
    setMenuOpen(true);
    setRainUsername(localStorage.getItem("rainUsername"));
    setVerified(localStorage.getItem("verified") === "true");
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          className="flex items-center space-x-2 focus:outline-none"
          onClick={handleMenuOpen}
        >
          {discordAvatar ? (
            <img
              src={discordAvatar}
              alt="User Avatar"
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300">
              <span className="text-sm font-medium text-gray-700">
                {username.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <span className="text-sm font-medium text-gray-700">{username}</span>
        </Menu.Button>
      </div>

      {menuOpen && (
        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {rainUsername && verified ? (
            <Menu.Item>
              {({ active }) => (
                <a
                  href="/dashboard"
                  className={cn(
                    "block px-4 py-2 text-sm",
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                  )}
                >
                  Rain.gg Dashboard
                </a>
              )}
            </Menu.Item>
          ) : (
            <Menu.Item>
              {({ active }) => (
                <a
                  href="/auth/link"
                  className={cn(
                    "block px-4 py-2 text-sm font-semibold text-purple-600",
                    active ? "bg-purple-50" : ""
                  )}
                >
                  Link Rain.gg Account
                </a>
              )}
            </Menu.Item>
          )}
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => {
                  if (onSignOut) {
                    onSignOut();
                  }
                  // Close dropdown
                  setMenuOpen(false);

                  // Use logout function from auth-context
                  const { logout } = useAuth();
                  logout();
                }}
                className={cn(
                  "block w-full px-4 py-2 text-left text-sm text-red-600",
                  active ? "bg-gray-100" : ""
                )}
              >
                Sign Out
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      )}
    </Menu>
  );
};

export default UserProfileDropdown;
