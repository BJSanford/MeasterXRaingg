"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Search } from "lucide-react"

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

export function LeaderboardTable() {
	const [searchTerm, setSearchTerm] = useState("")
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

	const filteredData = leaderboardData.filter((player) =>
		player.username.toLowerCase().includes(searchTerm.toLowerCase()),
	)

	const sortedData = [...filteredData].sort((a, b) => {
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
				<div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
					<div className="relative w-full sm:w-64">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
						<Input
							placeholder="Search player..."
							className="pl-10 bg-gray-900/50 border-gray-800 text-white"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" className="border-gray-800 bg-gray-900/50 text-white">
								Sort By
								<ChevronDown className="ml-2 h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem onClick={() => handleSort("wagered")}>Wagered Amount</DropdownMenuItem>
							<DropdownMenuItem onClick={() => handleSort("reward")}>Reward</DropdownMenuItem>
							<DropdownMenuItem onClick={() => handleSort("username")}>Username</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			<div className="rounded-lg overflow-hidden border border-gray-800">
				<Table>
					<TableHeader className="bg-gray-900/70">
						<TableRow className="hover:bg-gray-900/90 border-gray-800">
							<TableHead className="text-gray-400 w-16">Rank</TableHead>
							<TableHead className="text-gray-400">Player</TableHead>
							<TableHead className="text-gray-400 text-right">Wagered</TableHead>
							<TableHead className="text-gray-400 text-right">Reward</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{sortedData.map((player) => (
							<TableRow key={player.id} className="hover:bg-gray-800/50 border-gray-800 bg-gray-900/30">
								<TableCell className="font-medium">#{player.id}</TableCell>
								<TableCell>
									<div className="flex items-center gap-3">
										<Avatar className="h-8 w-8">
											<AvatarImage src={player.avatar || "/placeholder.svg"} alt={player.username} />
											<AvatarFallback className="bg-purple-900/50 text-white text-xs">
												{player.username.substring(0, 2).toUpperCase()}
											</AvatarFallback>
										</Avatar>
										<span>{player.username}</span>
									</div>
								</TableCell>
								<TableCell className="text-right">
									<div className="flex items-center justify-end">
										<div className="w-3 h-3 mr-1">
											<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<circle cx="12" cy="12" r="12" fill="#F7931A" />
											</svg>
										</div>
										<span className="text-cyan-400">{player.wagered.toLocaleString()}</span>
									</div>
								</TableCell>
								<TableCell className="text-right">
									<div className="flex items-center justify-end">
										<div className="w-3 h-3 mr-1">
											<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<circle cx="12" cy="12" r="12" fill="#F7931A" />
											</svg>
										</div>
										<span className={player.reward > 0 ? "text-yellow-400" : "text-gray-500"}>
											{player.reward.toLocaleString()}
										</span>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			<div className="mt-6 flex justify-center">
				<Button variant="outline" className="border-purple-500/30 text-white hover:bg-purple-500/20">
					Load More
				</Button>
			</div>
		</div>
	)
}
