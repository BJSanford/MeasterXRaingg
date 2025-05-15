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
            // Store full user object for dashboard usage
            localStorage.setItem("rainUsername", data.rainUsername);
            localStorage.setItem("user", JSON.stringify(data));

            // Set cookies for middleware (use discordUsername instead of userId)
            document.cookie = `discordUsername=${data.discordUsername}; path=/`;
            document.cookie = `rainUsername=${data.rainUsername}; path=/`;

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
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Dashboard Login</h1>
        {error && status === "authenticated" && <p className="mb-4 text-red-400">{error}</p>}
        {status !== "authenticated" && (
          <button
            className="px-6 py-2 bg-blue-600 rounded hover:bg-blue-700 text-white font-semibold"
            onClick={() => signIn("discord")}
            disabled={loading}
          >
            Sign in with Discord
          </button>
        )}
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
}
