"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

// Sample data for the wager history
const wagerData = [
	{ date: "Apr 22", amount: 0 },
	{ date: "Apr 23", amount: 150 },
	{ date: "Apr 24", amount: 320 },
	{ date: "Apr 25", amount: 256 },
	{ date: "Apr 26", amount: 0 },
	{ date: "Apr 27", amount: 189 },
	{ date: "Apr 28", amount: 251 },
]

export function WagerHistory() {
	const [timeRange, setTimeRange] = useState("week")

	return (
		<Card className="bg-gray-900/50 border-gray-800 w-full">
			<CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2 gap-2">
				<CardTitle className="text-lg font-medium">Wager History</CardTitle>
				<Select value={timeRange} onValueChange={setTimeRange}>
					<SelectTrigger className="w-full sm:w-[120px] bg-gray-800 border-gray-700">
						<SelectValue placeholder="Select range" />
					</SelectTrigger>
					<SelectContent className="bg-gray-800 border-gray-700">
						<SelectItem value="week">Last Week</SelectItem>
						<SelectItem value="month">Last Month</SelectItem>
						<SelectItem value="year">Last Year</SelectItem>
						<SelectItem value="all">All Time</SelectItem>
					</SelectContent>
				</Select>
			</CardHeader>
			<CardContent>
				<div className="h-[200px] sm:h-[250px] w-full">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart
							data={wagerData}
							margin={{ top: 20, right: 0, left: 0, bottom: 5 }}
						>
							<XAxis
								dataKey="date"
								stroke="#6b7280"
								fontSize={12}
								tickLine={false}
								axisLine={false}
							/>
							<YAxis
								stroke="#6b7280"
								fontSize={12}
								tickLine={false}
								axisLine={false}
								tickFormatter={(value) => (
									<>
										<img src="/coin.png" alt="coin" className="h-4 w-4 inline-block" />
										{value}
									</>
								)}
							/>
							<Tooltip
								contentStyle={{
									backgroundColor: "#1f2937",
									borderColor: "#374151",
									borderRadius: "0.5rem",
								}}
							/>
							<Bar
								dataKey="amount"
								fill="#4f46e5"
								radius={[4, 4, 0, 0]}
							/>
						</BarChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	)
}
