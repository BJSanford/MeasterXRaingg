"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import axios from "axios";

// Define types for rank and API response
interface Rank {
	level: string;
	threshold: number;
	claimable: number;
	rankReward: number;
	activeRakeback: number;
}

interface UserRakeback {
	wagered: number;
	claimable: number;
	active: number;
	currentRank: number; // index in ranks
}

// Rakeback tiers (should match /components/rakeback-tiers.tsx)
const ranks: Rank[] = [
	{ level: "Iron", threshold: 1000, claimable: 3.0, rankReward: 0.3, activeRakeback: 0.2 },
	{ level: "Bronze", threshold: 2500, claimable: 7.5, rankReward: 0.3, activeRakeback: 0.25 },
	{ level: "Silver", threshold: 5000, claimable: 15.0, rankReward: 0.3, activeRakeback: 0.3 },
	{ level: "Gold", threshold: 10000, claimable: 30.0, rankReward: 0.3, activeRakeback: 0.35 },
	{ level: "Platinum", threshold: 15000, claimable: 45.0, rankReward: 0.3, activeRakeback: 0.4 },
	{ level: "Emerald", threshold: 25000, claimable: 75.0, rankReward: 0.3, activeRakeback: 0.45 },
	{ level: "Diamond", threshold: 50000, claimable: 150.0, rankReward: 0.3, activeRakeback: 0.5 },
	{ level: "Blood Diamond", threshold: 75000, claimable: 225.0, rankReward: 0.3, activeRakeback: 0.55 },
	{ level: "Obsidian", threshold: 100000, claimable: 300.0, rankReward: 0.3, activeRakeback: 0.6 },
	{ level: "Imperial", threshold: 150000, claimable: 450.0, rankReward: 0.3, activeRakeback: 0.65 },
	{ level: "Ascendent", threshold: 200000, claimable: 600.0, rankReward: 0.3, activeRakeback: 0.7 },
];

export function RakebackSystem() {
	const [user, setUser] = useState<UserRakeback | null>(null);
	const [loading, setLoading] = useState(true);
	const [cashoutLoading, setCashoutLoading] = useState(false);

	// Fetch user rakeback info (mocked for now)
	useEffect(() => {
		// Replace with real API call
		async function fetchUser() {
			// Simulate API
			const wagered = 11660; // Example value
			let currentRank = 0;
			for (let i = ranks.length - 1; i >= 0; i--) {
				if (wagered >= ranks[i].threshold) {
					currentRank = i;
					break;
				}
			}
			// Simulate claimable and active
			setUser({
				wagered,
				claimable: ranks[currentRank].claimable,
				active: 12.5, // Example active rakeback
				currentRank,
			});
			setLoading(false);
		}
		fetchUser();
	}, []);

	// Cashout handler (calls Discord bot via backend API)
	const handleCashout = async () => {
		if (!user || user.active <= 0) return;
		setCashoutLoading(true);
		try {
			// Replace with real API call to trigger Discord bot
			await axios.post("/api/user/cashout", { amount: user.active });
			setUser({ ...user, active: 0 });
			alert("Cashout successful! A Discord bot has been pinged for your payout.");
		} catch (e) {
			alert("Cashout failed. Please try again later.");
		}
		setCashoutLoading(false);
	};

	if (loading || !user) return <div className="text-gray-400">Loading your rakeback information...</div>;

	return (
		<section className="space-y-8">
			{/* User Progress & All Ranks */}
			<div className="bg-gray-900/60 rounded-lg p-4 mb-4">
				<h2 className="text-xl font-bold mb-2">Rakeback Tiers & Progress</h2>
				<div className="overflow-x-auto">
					<div className="flex gap-4 min-w-[700px]">
						{ranks.map((tier, idx) => {
							const reached = user.wagered >= tier.threshold;
							const isCurrent = idx === user.currentRank;
							return (
								<div
									key={tier.level}
									className={`flex flex-col items-center p-3 rounded-lg border-2 ${
										isCurrent
											? "border-cyan-400 bg-cyan-900/30"
											: reached
											? "border-green-500 bg-green-900/10"
											: "border-gray-700 bg-gray-800/40"
									} min-w-[120px]`}
								>
									<Image
										src={`/images/tiers/${tier.level.toLowerCase().replace(/ /g, '-')}.png`}
										alt={tier.level}
										width={32}
										height={32}
										className="mb-1"
									/>
									<span className="font-bold text-base mb-1">{tier.level}</span>
									<span className="text-xs text-gray-400 mb-1">{tier.threshold.toLocaleString()} <img src="/coin.png" alt="coin" className="h-4 w-4 inline-block" /></span>
									<span className="text-xs text-yellow-400 mb-1">+{tier.claimable} <img src="/coin.png" alt="coin" className="h-4 w-4 inline-block" /></span>
									<span className="text-xs text-cyan-400">{tier.activeRakeback}% RB</span>
									{isCurrent && <span className="mt-1 px-2 py-0.5 text-xs bg-cyan-500/30 text-cyan-200 rounded-full">Current</span>}
								</div>
							);
						})}
					</div>
				</div>
				{/* Progress bar to next rank */}
				{user.currentRank < ranks.length - 1 && (
					<div className="mt-4">
						<Progress
							value={
								((user.wagered - ranks[user.currentRank].threshold) /
									(ranks[user.currentRank + 1].threshold - ranks[user.currentRank].threshold)) * 100
							}
							className="h-2 bg-gray-800"
							style={{ background: "linear-gradient(to right, #06b6d4, #a855f7)" }}
						/>
						<div className="flex justify-between text-xs text-gray-400 mt-1">
							<span>
								<img src="/coin.png" alt="coin" className="h-4 w-4 inline-block" />
								{user.wagered.toLocaleString()}
							</span>
							<span>
								Next: <img src="/coin.png" alt="coin" className="h-4 w-4 inline-block" />
								{ranks[user.currentRank + 1].threshold.toLocaleString()}
							</span>
						</div>
					</div>
				)}
			</div>

			{/* Claimable & Active Rakeback */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* Claimable Rakeback */}
				<div className="bg-gray-900/60 rounded-lg p-4 flex flex-col items-start">
					<h3 className="text-lg font-bold mb-2">Claimable Rakeback</h3>
					<div className="flex items-center gap-2 mb-2">
						<img src="/coin.png" alt="coin" className="h-5 w-5" />
						<span className="text-2xl font-bold text-yellow-400">{user.claimable}</span>
					</div>
					<p className="text-xs text-gray-400 mb-2">One-time reward for reaching your current rank.</p>
					<button
						className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
						disabled={user.claimable <= 0}
						onClick={() => alert("Claim logic to be implemented (Discord bot ping)")}
					>
						Claim Now
					</button>
				</div>
				{/* Active Rakeback */}
				<div className="bg-gray-900/60 rounded-lg p-4 flex flex-col items-start">
					<h3 className="text-lg font-bold mb-2">Active Rakeback</h3>
					<div className="flex items-center gap-2 mb-2">
						<img src="/coin.png" alt="coin" className="h-5 w-5" />
						<span className="text-2xl font-bold text-green-400">{user.active.toFixed(2)}</span>
					</div>
					<p className="text-xs text-gray-400 mb-2">Earned from all wagers at your current rank. Updates every 10 minutes.</p>
					<button
						className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50"
						disabled={user.active <= 0 || cashoutLoading}
						onClick={handleCashout}
					>
						{cashoutLoading ? "Processing..." : "Cashout"}
					</button>
				</div>
			</div>
		</section>
	);
}
