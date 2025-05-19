"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

// Set the end date to 2 days from now for demo purposes
const endDate = new Date()
endDate.setDate(endDate.getDate() + 2)

export function LeaderboardCountdown({ timeLeft }: { timeLeft: string }) {
  return (
    <div className="my-10">
      <Card className="bg-gray-900/50 border-gray-800 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-4">
              <svg
                className="h-5 w-5 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
              <h2 className="text-xl font-bold text-white">LEADERBOARD ENDS IN</h2>
            </div>
            <p className="text-lg font-medium text-gray-400">{timeLeft || "Calculating..."}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
