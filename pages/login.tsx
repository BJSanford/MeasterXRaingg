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
      const interval = setInterval(() => {
        fetch("/api/user/verification-status")
          .then((res) => res.json())
          .then((data) => {
            if (data.verified) {
              clearInterval(interval);
              router.push("/dashboard");
            }
          })
          .catch(() => {
            setError("Failed to check verification status.");
          });
      }, 15000); // Check every 15 seconds

      return () => clearInterval(interval);
    }
  }, [status, session, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <div className="text-center p-8 bg-gray-800 rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-extrabold mb-6">Welcome to Rain.gg</h1>
        <p className="text-lg mb-4 text-gray-400">Sign in to access your dashboard</p>
        {error && status === "authenticated" && <p className="mb-4 text-red-400">{error}</p>}
        {status !== "authenticated" && (
          <button
            className="btn-primary w-full max-w-sm mx-auto"
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
