import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      setLoading(true);
      // Fetch Rain.gg username associated with this Discord ID
      fetch("/api/user/dashboard")
        .then((res) => res.json())
        .then((data) => {
          if (data.rainUsername) {
            // Store rainUsername for dashboard usage
            localStorage.setItem("rainUsername", data.rainUsername);
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
        {error && <p className="mb-4 text-red-400">{error}</p>}
        {status !== "authenticated" && (
          <button
            onClick={() => signIn("discord")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
