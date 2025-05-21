"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

export function LeaderboardCountdown({ startDate, endDate }: { startDate: string; endDate: string }) {
  const calculateTimeLeft = (targetDate: string) => {
    const difference = +new Date(targetDate) - +new Date()
    let timeLeft = {}

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

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(startDate))
  const [isBeforeStart, setIsBeforeStart] = useState(new Date() < new Date(startDate))

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      if (isBeforeStart) {
        const timeLeftUntilStart = calculateTimeLeft(startDate)
        setTimeLeft(timeLeftUntilStart)
        if (now >= new Date(startDate)) {
          setIsBeforeStart(false)
          setTimeLeft(calculateTimeLeft(endDate))
        }
      } else {
        const timeLeftUntilEnd = calculateTimeLeft(endDate)
        setTimeLeft(timeLeftUntilEnd)
        if (now >= new Date(endDate)) {
          clearInterval(timer) // Stop the timer when the race ends
        }
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [startDate, endDate, isBeforeStart])

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
              <h2 className="text-xl font-bold text-white">
                {isBeforeStart ? "LEADERBOARD STARTS IN" : "LEADERBOARD ENDS IN"}
              </h2>
            </div>

            <div className="grid grid-cols-4 gap-4 w-full max-w-md">
              <div className="flex flex-col items-center">
                <div className="bg-gray-800 text-white text-2xl font-bold w-16 h-16 flex items-center justify-center rounded-lg border border-gray-700">
                  {timeLeft.days || "0"}
                </div>
                <span className="text-xs text-gray-400 mt-2">Days</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-gray-800 text-white text-2xl font-bold w-16 h-16 flex items-center justify-center rounded-lg border border-gray-700">
                  {timeLeft.hours || "0"}
                </div>
                <span className="text-xs text-gray-400 mt-2">Hours</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-gray-800 text-white text-2xl font-bold w-16 h-16 flex items-center justify-center rounded-lg border border-gray-700">
                  {timeLeft.minutes || "0"}
                </div>
                <span className="text-xs text-gray-400 mt-2">Minutes</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-gray-800 text-white text-2xl font-bold w-16 h-16 flex items-center justify-center rounded-lg border border-gray-700">
                  {timeLeft.seconds || "0"}
                </div>
                <span className="text-xs text-gray-400 mt-2">Seconds</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
