"use client";

import { useAuth } from "@/lib/auth-context";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";

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
	const { user } = useAuth();
	const [rakeback, setRakeback] = useState<null | {
		claimable: number;
		active: number;
		currentRank: number;
	}>(null);
	const [loading, setLoading] = useState(true);
	const [cashoutLoading, setCashoutLoading] = useState(false);
	const [claimLoading, setClaimLoading] = useState(false);

	useEffect(() => {
		if (!user) return;
		// Calculate current rank
		let currentRank = -1;
		for (let i = ranks.length - 1; i >= 0; i--) {
			if (user.totalWagered >= ranks[i].threshold) {
				currentRank = i;
				break;
			}
		}
		if (currentRank < 0) {
			setRakeback(null);
			setLoading(false);
			return;
		}
		// Calculate claimable and active rakeback
		const claimable = ranks[currentRank].claimable;
		const percent = ranks[currentRank].activeRakeback;
		const active = Number(((user.totalWagered - ranks[currentRank].threshold) * percent / 100).toFixed(2));
		setRakeback({ claimable, active, currentRank });
		setLoading(false);
	}, [user]);

	// Cashout handler (calls Discord bot via backend API)
	const handleCashout = async () => {
		if (!rakeback || rakeback.active <= 0) return;
		setCashoutLoading(true);
		try {
			await axios.post("/api/user/cashout", { amount: rakeback.active });
			setRakeback({ ...rakeback, active: 0 });
			alert("Cashout successful! A Discord bot has been pinged for your payout.");
		} catch (e) {
			alert("Cashout failed. Please try again later.");
		}
		setCashoutLoading(false);
	};

	// Claim handler (calls Discord bot via backend API)
	const handleClaim = async () => {
		if (!rakeback || rakeback.claimable <= 0) return;
		setClaimLoading(true);
		try {
			await axios.post("/api/user/claim", { amount: rakeback.claimable });
			alert("Claim successful! A Discord bot has been pinged for your claim.");
		} catch (e) {
			alert("Claim failed. Please try again later.");
		}
		setClaimLoading(false);
	};

	if (!user || loading) return <div className="text-gray-400">Loading your rakeback information...</div>;
	if (!rakeback) return (
		<section className="space-y-8">
			<div className="bg-gray-900/60 rounded-lg p-4 mb-4">
				<h2 className="text-xl font-bold mb-2 text-white">Rakeback Tiers & Progress</h2>
				<p className="text-gray-400">Reach <span className="text-cyan-400 font-bold">Iron</span> rank by wagering at least <span className="text-yellow-400 font-bold">1,000</span> coins to unlock rakeback rewards!</p>
			</div>
		</section>
	);

	return (
		<section className="space-y-8">
			{/* User Progress & All Ranks */}
			<div className="bg-gray-900/60 rounded-lg p-4 mb-4">
				<h2 className="text-xl font-bold mb-2 text-white">Rakeback Tiers & Progress</h2>
				<div className="overflow-x-auto">
					<div className="flex gap-4 min-w-[700px]">
						{ranks.map((tier, idx) => {
							const reached = user.totalWagered >= tier.threshold;
							const isCurrent = idx === rakeback.currentRank;
							return (
								<div
									key={tier.level}
									className={`flex flex-col items-center p-3 rounded-lg border-2 min-w-[120px] ${
										isCurrent
											? "border-cyan-400 bg-cyan-900/30"
											: reached
											? "border-green-500 bg-green-900/10"
											: "border-gray-700 bg-gray-800/40"
									}`}
								>
									<Image
										src={`/images/tiers/${tier.level.toLowerCase().replace(/ /g, '-')}.png`}
										alt={tier.level}
										width={32}
										height={32}
										className="mb-1"
									/>
									<span className="font-bold text-base mb-1 text-white">{tier.level}</span>
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
				{rakeback.currentRank < ranks.length - 1 && (
					<div className="mt-4">
						<Progress
							value={
								((user.totalWagered - ranks[rakeback.currentRank].threshold) /
									(ranks[rakeback.currentRank + 1].threshold - ranks[rakeback.currentRank].threshold)) * 100
							}
							className="h-2 bg-gray-800"
							style={{ background: "linear-gradient(to right, #06b6d4, #a855f7)" }}
						/>
						<div className="flex justify-between text-xs text-gray-400 mt-1">
							<span>
								<img src="/coin.png" alt="coin" className="h-4 w-4 inline-block" />
								{user.totalWagered.toLocaleString()}
							</span>
							<span>
								Next: <img src="/coin.png" alt="coin" className="h-4 w-4 inline-block" />
								{ranks[rakeback.currentRank + 1].threshold.toLocaleString()}
							</span>
						</div>
					</div>
				)}
			</div>

			{/* Claimable & Active Rakeback */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* Claimable Rakeback */}
				<div className="bg-gray-900/60 rounded-lg p-4 flex flex-col items-start">
					<h3 className="text-lg font-bold mb-2 text-white">Claimable Rakeback</h3>
					<div className="flex items-center gap-2 mb-2">
						<img src="/coin.png" alt="coin" className="h-5 w-5" />
						<span className="text-2xl font-bold text-yellow-400">{rakeback.claimable}</span>
					</div>
					<p className="text-xs text-gray-400 mb-2">One-time reward for reaching your current rank.</p>
					<button
						className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
						disabled={rakeback.claimable <= 0 || claimLoading}
						onClick={handleClaim}
					>
						{claimLoading ? "Processing..." : "Claim Now"}
					</button>
				</div>
				{/* Active Rakeback */}
				<div className="bg-gray-900/60 rounded-lg p-4 flex flex-col items-start">
					<h3 className="text-lg font-bold mb-2 text-white">Active Rakeback</h3>
					<div className="flex items-center gap-2 mb-2">
						<img src="/coin.png" alt="coin" className="h-5 w-5" />
						<span className="text-2xl font-bold text-green-400">{rakeback.active.toFixed(2)}</span>
					</div>
					<p className="text-xs text-gray-400 mb-2">Earned from all wagers at your current rank. Updates every 10 minutes.</p>
					<button
						className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50"
						disabled={rakeback.active <= 0 || cashoutLoading}
						onClick={handleCashout}
					>
						{cashoutLoading ? "Processing..." : "Cashout"}
					</button>
				</div>
			</div>
		</section>
	);
}
