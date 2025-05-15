"use client"

import CityOverlay from "../city-overlay"
import SnowOverlay from "../snow-overlay"
import LoginButton from "@/components/LoginButton"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <CityOverlay />
      <SnowOverlay />
      <main className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-6">Dashboard Login</h1>
          <LoginButton />
        </div>
      </main>
    </div>
  )
}