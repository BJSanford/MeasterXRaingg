import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status !== "authenticated") {
      setError(null); // Clear error if not authenticated
      setLoading(false);
      return;
    }
    if (session?.user?.id) {
      setLoading(true);
      // Fetch Rain.gg username associated with this Discord ID
      fetch("/api/user/dashboard")
        .then((res) => res.json())
        .then((data) => {
          if (data.rainUsername) {
            // Only store minimal info in localStorage
            localStorage.setItem("rainUsername", data.rainUsername);
            localStorage.setItem("discordUsername", data.discordUsername);
            localStorage.setItem("verified", data.verified ? "true" : "false");

            // Set cookies for middleware (use discordUsername instead of userId)
            document.cookie = `discordUsername=${data.discordUsername}; path=/`;
            document.cookie = `rainUsername=${data.rainUsername}; path=/`;
            document.cookie = `verified=${data.verified ? "true" : "false"}; path=/`;

            router.push("/dashboard");
          } else {
            setError("No Rain.gg account found for this Discord ID. Please register first.");
            setLoading(false);
          }
        })
        .catch(() => {
          setError("Failed to fetch user data.");
          setLoading(false);
        });
    }
  }, [status, session, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <div className="text-center p-8 bg-gray-800 rounded-2xl shadow-2xl max-w-md">
        <h1 className="text-4xl font-extrabold mb-6">Welcome to Rain.ggXMeasterSkins</h1>
        <p className="text-lg mb-4 text-gray-400">Sign in to access your dashboard</p>
        {error && status === "authenticated" && <p className="mb-4 text-red-400">{error}</p>}
        {status !== "authenticated" && (
          <button
            className="w-full px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 text-white font-semibold transition-all"
            onClick={() => signIn("discord")}
            disabled={loading}
          >
            Sign in with Discord
          </button>
        )}
        {loading && <p className="mt-4 text-gray-400">Loading...</p>}
      </div>
    </div>
  );
}
