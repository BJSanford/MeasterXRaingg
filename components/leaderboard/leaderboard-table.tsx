"use client"

import { useState } from "react"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

// Sample data for the leaderboard
const leaderboardData = [
	{
		id: 4,
		username: "NitroGuy",
		avatar: "/placeholder.svg",
		wagered: 5185.18,
		reward: 250.0,
	},
	{
		id: 5,
		username: "Kershey",
		avatar: "/placeholder.svg",
		wagered: 4838.47,
		reward: 100.0,
	},
	{
		id: 6,
		username: "RBGaze",
		avatar: "/placeholder.svg",
		wagered: 4713.78,
		reward: 50.0,
	},
	{
		id: 7,
		username: "LessCrazy",
		avatar: "/placeholder.svg",
		wagered: 4500.95,
		reward: 25.0,
	},
	{
		id: 8,
		username: "a******4",
		avatar: "/placeholder.svg",
		wagered: 2835.17,
		reward: 25.0,
	},
	{
		id: 9,
		username: "p******e",
		avatar: "/placeholder.svg",
		wagered: 2465.03,
		reward: 25.0,
	},
	{
		id: 10,
		username: "g******j",
		avatar: "/placeholder.svg",
		wagered: 2420.6,
		reward: 25.0,
	},
	{
		id: 11,
		username: "k******g",
		avatar: "/placeholder.svg",
		wagered: 1788.02,
		reward: 0.0,
	},
	{
		id: 12,
		username: "j******o",
		avatar: "/placeholder.svg",
		wagered: 1700.81,
		reward: 0.0,
	},
	{
		id: 13,
		username: "i******n",
		avatar: "/placeholder.svg",
		wagered: 1488.99,
		reward: 0.0,
	},
	{
		id: 14,
		username: "C****n",
		avatar: "/placeholder.svg",
		wagered: 1470.37,
		reward: 0.0,
	},
	{
		id: 15,
		username: "yenta",
		avatar: "/placeholder.svg",
		wagered: 296.0,
		reward: 0.0,
	},
]

const PRIZE_DISTRIBUTION = [700, 350, 200, 100, 75, 50, 15, 10]; // Hardcoded prize distribution

export function LeaderboardTable({ leaderboard, isLoading, error, reload }: { leaderboard: any[], isLoading: boolean, error: string | null, reload: () => void }) {
	const [sortBy, setSortBy] = useState("wagered")
	const [sortOrder, setSortOrder] = useState("desc")

	const handleSort = (column) => {
		if (sortBy === column) {
			setSortOrder(sortOrder === "asc" ? "desc" : "asc")
		} else {
			setSortBy(column)
			setSortOrder("desc")
		}
	}

	const sortedData = [...leaderboard].sort((a, b) => {
		if (sortOrder === "asc") {
			return a[sortBy] > b[sortBy] ? 1 : -1
		} else {
			return a[sortBy] < b[sortBy] ? 1 : -1
		}
	})

	return (
		<div className="mb-10">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
				<h2 className="text-2xl font-bold">Current Rankings</h2>
			</div>

			<div className="rounded-lg overflow-hidden border border-gray-800">
				{isLoading ? (
					<div className="flex h-[300px] items-center justify-center">
						<div className="h-8 w-8 rounded-full border-4 border-gray-700 border-t-yellow-500 animate-spin"></div>
					</div>
				) : error ? (
					<div className="flex h-[200px] flex-col items-center justify-center text-center">
						<p className="mb-4 text-red-400">{error}</p>
						<Button onClick={reload} variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
							Try Again
						</Button>
					</div>
				) : (
					<Table>
						<TableHeader className="bg-gray-900/70">
							<TableRow>
								<TableHead className="text-gray-400 w-16">Rank</TableHead>
								<TableHead className="text-gray-400">Player</TableHead>
								<TableHead className="text-gray-400 text-right">Wagered</TableHead>
								<TableHead className="text-gray-400 text-right">Prize</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{leaderboard.map((player, index) => (
								<TableRow key={player.username}>
									<TableCell>#{index + 4}</TableCell>
									<TableCell>
										<div className="flex items-center gap-3">
											<Avatar className="h-8 w-8">
												<AvatarImage src={player.avatar || "/placeholder.svg"} alt={player.username} />
												<AvatarFallback className="bg-purple-900/50 text-white text-xs">
													{player.username.substring(0, 2) + "*".repeat(Math.max(0, player.username.length - 2))}
												</AvatarFallback>
											</Avatar>
											<span>{player.username.substring(0, 2) + '*'.repeat(player.username.length - 2)}</span>
										</div>
									</TableCell>
									<TableCell className="text-right">
										<div className="flex items-center justify-end">
											<Image src="/coin.png" alt="Coin" width={16} height={16} className="mr-1" />
											<span className="text-cyan-400">{player.wagered?.toLocaleString() || "0"}</span>
										</div>
									</TableCell>
									<TableCell className="text-right">
										<div className="flex items-center justify-end">
											<Image src="/coin.png" alt="Coin" width={16} height={16} className="mr-1" />
											<span className={player.prize > 0 ? "text-yellow-400" : "text-gray-500"}>
												{player.prize?.toLocaleString() || "0"}
											</span>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}
			</div>
		</div>
	)
}
