import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [rainUsername, setRainUsername] = useState("");

  const handleDiscordLogin = () => {
    // Pass rainUsername as a query param or via localStorage/session
    signIn("discord", { callbackUrl: `/auth/callback?rainUsername=${rainUsername}` });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Rain.gg Username"
        value={rainUsername}
        onChange={e => setRainUsername(e.target.value)}
      />
      <button onClick={handleDiscordLogin}>Sign in with Discord</button>
      {/* UI feedback about verification process */}
    </div>
  );
}
