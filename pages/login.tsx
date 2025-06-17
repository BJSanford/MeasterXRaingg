import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [loginAttempted, setLoginAttempted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "loading") return; // Handle loading state
    if (status === "authenticated") {
      if (session?.user) {
        // Store Discord user details in localStorage
        localStorage.setItem("discordUsername", session.user.name || "");
        localStorage.setItem("discordId", session.user.id || "");
        localStorage.setItem("rainUsername", session.user.rainUsername || "");
        localStorage.setItem("rainId", session.user.rainId || "");
        localStorage.setItem("verified", session.user.verified ? "true" : "false");

        const avatar = (session.user as any)?.image;
        localStorage.setItem("discordAvatar", typeof avatar === "string" ? avatar : "");

        // Set cookies for middleware authentication
        Cookies.set("discordUsername", session.user.name || "", { path: "/" });
        Cookies.set("rainUsername", session.user.rainUsername || "", { path: "/" });
        Cookies.set("verified", session.user.verified ? "true" : "false", { path: "/" });

        // Redirect to home page after login
        router.push("/");
      }

      const verified = localStorage.getItem("verified") === "true";
      const rainUsername = localStorage.getItem("rainUsername");

      if (verified && rainUsername) {
        // Redirect to dashboard if user is verified and has a Rain username
        router.push("/dashboard");
      } else {
        // Redirect to login if not verified or missing Rain username
        router.push("/login");
      }
    } else if (status === "unauthenticated") {
      if (!loginAttempted) {
        setLoginAttempted(true);
        signIn("discord");
      } else {
        setLoading(false);
        setError(
          ""
        );
      }
    }
  }, [status, session, router, loginAttempted]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <div className="text-center p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Logging in...</h1>
        {loading && (
          <p className="text-gray-400">
            Please wait while we log you in with Discord.
          </p>
        )}
        {error && <p className="text-red-400 mt-4">{error}</p>}
      </div>
    </div>
  );
}
