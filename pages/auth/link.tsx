import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function LinkAccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [rainUsername, setRainUsername] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    if (status === "loading") return;

    const storedRainUsername = sessionStorage.getItem("pendingRainUsername");
    setRainUsername(storedRainUsername);

    if (!storedRainUsername) {
      setError("No Rain.gg username found. Please start the login process again.");
      return;
    }

    if (!session?.user?.id || !session?.user?.name) {
      setError("No Discord user information found. Please try again.");
      return;
    }
  }, [session, status]);

  async function checkVerificationStatus() {
    setIsChecking(true);
    setError(null);

    try {
      const res = await fetch(`/api/verification/status?discordId=${session?.user?.id}`);
      const data = await res.json();

      if (data.verified) {
        router.push("/dashboard");
      } else {
        setError("Your account is not verified yet. Please wait for a moderator to approve.");
      }
    } catch (err) {
      setError("Failed to check verification status. Please try again.");
    } finally {
      setIsChecking(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <Card className="w-full max-w-md border-gray-800 bg-gray-800/80 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Account Linking</CardTitle>
          <CardDescription className="text-center text-gray-400">
            Link your Rain.gg account with Discord
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && <div className="mb-4 text-center text-red-400">{error}</div>}
          <div className="mb-4 text-center">
            <p className="text-gray-300">
              Rain.gg Username: <span className="font-bold">{rainUsername}</span>
            </p>
            <p className="text-gray-300">
              Discord Username: <span className="font-bold">{session?.user?.name}</span>
            </p>
          </div>
          <Button
            onClick={checkVerificationStatus}
            className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800"
            disabled={isChecking}
          >
            {isChecking ? "Checking..." : "Check Verification Status"}
          </Button>
          <Button
            onClick={() => router.push("/login")}
            className="mt-4 w-full bg-gray-700 hover:bg-gray-600"
          >
            Go Back to Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
