export function Podium({ topThree }: { topThree: any[] }) {
  return (
    <div className="flex justify-center items-end gap-8 mb-12">
      {topThree.map((user, idx) => (
        <div key={user.username} className={`flex flex-col items-center ${idx === 1 ? "scale-105" : ""}`}>
          <div className="mb-2">
            <div className={`rounded-full border-4 ${idx === 0 ? "border-yellow-400" : idx === 1 ? "border-gray-400" : "border-orange-400"} bg-gray-800 shadow-lg w-24 h-24 flex items-center justify-center`}>
              <img src={user.avatar} alt={user.username} className="w-20 h-20 rounded-full object-cover" />
            </div>
          </div>
          <div className="text-lg font-bold">{user.username}</div>
          <div className="text-gray-400">{["1st Place", "2nd Place", "3rd Place"][idx]}</div>
          <div className="text-yellow-400 text-xl font-bold">${user.prize}</div>
        </div>
      ))}
    </div>
  );
}
