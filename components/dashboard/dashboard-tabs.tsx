"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Zap, Gift, ShoppingCart, Trophy } from "lucide-react"

export function DashboardTabs() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex justify-center mb-8">
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full max-w-3xl">
        <TabsList className="grid grid-cols-5 bg-gray-900/50 border border-gray-800 rounded-lg p-1">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-gray-800 data-[state=active]:text-white rounded-md py-2"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger
            value="rakeback"
            className="data-[state=active]:bg-gray-800 data-[state=active]:text-white rounded-md py-2"
          >
            <Zap className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Rakeback</span>
          </TabsTrigger>
          <TabsTrigger
            value="giveaways"
            className="data-[state=active]:bg-gray-800 data-[state=active]:text-white rounded-md py-2"
          >
            <Gift className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Giveaways</span>
          </TabsTrigger>
          <TabsTrigger
            value="rewards"
            className="data-[state=active]:bg-gray-800 data-[state=active]:text-white rounded-md py-2"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Rewards</span>
          </TabsTrigger>
          <TabsTrigger
            value="tournaments"
            className="data-[state=active]:bg-gray-800 data-[state=active]:text-white rounded-md py-2"
          >
            <Trophy className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Tournaments</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
