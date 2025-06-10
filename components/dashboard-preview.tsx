"use client"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export function DashboardPreview() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="w-full">
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 bg-gray-900/50 border border-gray-800 rounded-lg p-1 mb-4">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-gray-800 data-[state=active]:text-white rounded-md py-2"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="wager"
            className="data-[state=active]:bg-gray-800 data-[state=active]:text-white rounded-md py-2"
          >
            Wager History
          </TabsTrigger>
          <TabsTrigger
            value="rakeback"
            className="data-[state=active]:bg-gray-800 data-[state=active]:text-white rounded-md py-2"
          >
            Rakeback
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0">
          <div className="relative w-full h-[300px] md:h-[400px]">
            <Image
              src="/placeholder.svg?height=400&width=600&text=Dashboard+Overview"
              alt="Dashboard Overview"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </TabsContent>

        <TabsContent value="wager" className="mt-0">
          <div className="relative w-full h-[300px] md:h-[400px]">
            <Image
              src="/placeholder.svg?height=400&width=600&text=Wager+History+Chart"
              alt="Wager History Chart"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </TabsContent>

        <TabsContent value="rakeback" className="mt-0">
          <div className="relative w-full h-[300px] md:h-[400px]">
            <Image
              src="/placeholder.svg?height=400&width=600&text=Rakeback+Progress"
              alt="Rakeback Progress"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-3">
          <p className="text-xs text-gray-400">Total Wagered</p>
          <p className="text-lg font-bold flex items-center">
            <img src="/coin.png" alt="coin" className="h-4 w-4 mr-1 inline-block" />
            1,166.39
          </p>
        </div>
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-3">
          <p className="text-xs text-gray-400">Current Rakeback</p>
          <p className="text-lg font-bold">5%</p>
        </div>
      </div>
    </div>
  )
}
