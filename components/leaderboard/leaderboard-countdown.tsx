"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

// Set the end date to 2 days from now for demo purposes
const endDate = new Date()
endDate.setDate(endDate.getDate() + 2)

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function LeaderboardCountdown() {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +endDate - +new Date()
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 }

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft())

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearTimeout(timer)
  })

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
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="6" x2="12" y2="12"></line>
                <line x1="12" y1="12" x2="16" y2="16"></line>
              </svg>
              <span className="text-lg font-medium">Time Left</span>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">
                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
              </p>
              <p className="text-sm text-gray-400">Until the leaderboard resets</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
