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
      setError(null);
      setLoading(false);
      return;
    }
    const discordId = session?.user?.id;
    const discordUsername = session?.user?.name;
    if (discordId && discordUsername) {
      setLoading(true);
      fetch(`/api/user/dashboard?discordId=${encodeURIComponent(discordId)}&discordUsername=${encodeURIComponent(discordUsername)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.verified && data.rainUsername) {
            localStorage.setItem("rainUsername", data.rainUsername);
            router.push("/dashboard");
          } else if (data.rainUsername && !data.verified) {
            setError("Your account is not verified yet. Please complete the verification process.");
            setLoading(false);
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
