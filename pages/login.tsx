import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      // Store Discord user details in localStorage
      if (session?.user) {
        localStorage.setItem("discordUsername", session.user.name || "");
        localStorage.setItem("discordAvatar", session.user.image || "");
      }
      // Redirect to home page after login
      router.push("/");
    } else if (status === "unauthenticated") {
      // Trigger Discord login
      signIn("discord");
    }
  }, [status, session, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <div className="text-center p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Logging in...</h1>
        {loading && <p className="text-gray-400">Please wait while we log you in with Discord.</p>}
      </div>
    </div>
  );
}
