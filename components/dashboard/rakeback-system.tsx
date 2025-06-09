import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import axios from "axios";

const ranks = [
  { level: "Iron", threshold: 1000, percentage: 0.5, claimable: 5 },
  { level: "Bronze", threshold: 2500, percentage: 0.5, claimable: 12.5 },
  { level: "Silver", threshold: 5000, percentage: 0.5, claimable: 25 },
  { level: "Gold", threshold: 10000, percentage: 0.5, claimable: 50 },
  { level: "Platinum", threshold: 15000, percentage: 0.5, claimable: 75 },
  { level: "Emerald", threshold: 25000, percentage: 0.5, claimable: 125 },
  { level: "Diamond", threshold: 50000, percentage: 0.5, claimable: 250 },
  { level: "Blood Diamond", threshold: 75000, percentage: 0.5, claimable: 375 },
  { level: "Obsidian", threshold: 100000, percentage: 0.5, claimable: 500 },
  { level: "Imperial", threshold: 150000, percentage: 0.5, claimable: 750 },
  { level: "Ascendent", threshold: 200000, percentage: 0.5, claimable: 1000 },
];

export function RakebackSystem() {
  const [wagered, setWagered] = useState(0);
  const [currentRank, setCurrentRank] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fetch the user's wagered amount
    axios.get("/api/user/wagered").then((response) => {
      const wageredAmount = response.data.wagered;
      setWagered(wageredAmount);

      // Determine the user's rank and progress
      for (let i = ranks.length - 1; i >= 0; i--) {
        if (wageredAmount >= ranks[i].threshold) {
          setCurrentRank(ranks[i]);
          const nextThreshold = ranks[i + 1]?.threshold || ranks[i].threshold;
          setProgress(((wageredAmount - ranks[i].threshold) / (nextThreshold - ranks[i].threshold)) * 100);
          break;
        }
      }
    });
  }, []);

  const handleClaim = () => {
    axios.post("/api/user/claim", { amount: currentRank.claimable }).then(() => {
      alert("Claim successful! A tip request has been sent to Measter.");
    });
  };

  return (
    <div className="space-y-4">
      {currentRank ? (
        <div className="p-4 rounded-lg border bg-gray-800/70 border-purple-500/50">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-lg">{currentRank.level} Rank</span>
            <span className="font-bold text-purple-400">{currentRank.percentage}% Rakeback</span>
          </div>
          <div className="text-sm text-gray-400 mb-4">
            <p>Wagered: ${wagered.toLocaleString()}</p>
            <p>Claimable: {currentRank.claimable} coins</p>
          </div>
          <Progress
            value={progress}
            className="h-2 bg-gray-800"
            indicatorClassName="bg-gradient-to-r from-purple-600 to-cyan-600"
          />
          <button
            onClick={handleClaim}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Claim Rakeback
          </button>
        </div>
      ) : (
        <p className="text-gray-400">Loading your rakeback information...</p>
      )}
    </div>
  );
}
