"use client";

import React, { useState, useEffect } from "react";
import { Menu } from "@headlessui/react";
import { cn } from "@/lib/utils";
import { fetchLeaderboardByType } from "@/lib/server-api";

interface UserProfileDropdownProps {
  username: string;
  avatarUrl?: string;
}

const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({ username, avatarUrl }) => {
  const [avatar, setAvatar] = useState<string | undefined>(avatarUrl);

  useEffect(() => {
    if (!avatar) {
      fetchRainAvatar(username).then((url) => {
        if (url) {
          setAvatar(url);
          document.cookie = `rainAvatar=${encodeURIComponent(url)}; path=/`;
        }
      });
    }
  }, [username, avatar]);

  const fetchRainAvatar = async (username: string): Promise<string> => {
    try {
      const leaderboardData = await fetchLeaderboardByType(
        "wagered",
        "2024-01-01T00:00:00.00Z",
        "2026-01-01T00:00:00.00Z"
      );

      const user = leaderboardData.results.find(
        (u: any) => u.username.trim().toLowerCase() === username.trim().toLowerCase()
      );

      if (user?.avatar?.medium) {
        return user.avatar.medium;
      } else {
        console.error("Avatar not found for user:", username);
        return "";
      }
    } catch (error) {
      console.error("Error fetching rain avatar:", error);
      return "";
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="flex items-center space-x-2 focus:outline-none">
        {avatar ? (
          <img
            src={avatar}
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

      <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <Menu.Item>
          {({ active }) => (
            <a
              href="/dashboard"
              className={cn(
                "block px-4 py-2 text-sm",
                active ? "bg-gray-100 text-gray-900" : "text-gray-700"
              )}
            >
              Dashboard
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a
              href="/settings"
              className={cn(
                "block px-4 py-2 text-sm",
                active ? "bg-gray-100 text-gray-900" : "text-gray-700"
              )}
            >
              Settings
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={() => {
                document.cookie = "rainAvatar=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                document.cookie = "rainUsername=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                window.location.href = "/logout";
              }}
              className={cn(
                "block w-full px-4 py-2 text-left text-sm",
                active ? "bg-gray-100 text-gray-900" : "text-gray-700"
              )}
            >
              Sign Out
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default UserProfileDropdown;
