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
        // Store Discord user details in secure cookies
        Cookies.set("discordUsername", session.user.name || "", { path: "/", secure: true, sameSite: "Strict" });
        Cookies.set("discordId", session.user.id || "", { path: "/", secure: true, sameSite: "Strict" });
        Cookies.set("rainUsername", session.user.rainUsername || "", { path: "/", secure: true, sameSite: "Strict" });
        Cookies.set("rainId", session.user.rainId || "", { path: "/", secure: true, sameSite: "Strict" });
        Cookies.set("verified", session.user.verified ? "true" : "false", { path: "/", secure: true, sameSite: "Strict" });

        // Store Discord avatar in localStorage
        const avatar = (session.user as any)?.image;
        localStorage.setItem("discordAvatar", typeof avatar === "string" ? avatar : "");

        // Fetch Rain ID dynamically if not available in session
        if (!session.user.rainId) {
          (async () => {
            try {
              const response = await fetch(`/api/user/claim`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ rainUsername: session.user.rainUsername }),
              });

              if (response.ok) {
                const data = await response.json();
                Cookies.set("rainId", data.rainId || "", { path: "/", secure: true, sameSite: "Strict" });
              } else {
                console.error("Failed to fetch Rain ID dynamically.");
              }
            } catch (error) {
              console.error("Error fetching Rain ID dynamically:", error);
            }
          })();
        }

        // Redirect to home page after login
        router.push("/");
      }
    } else if (status === "unauthenticated") {
      if (!loginAttempted) {
        setLoginAttempted(true);
        signIn("discord");
      } else {
        setLoading(false);
        setError("");
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
