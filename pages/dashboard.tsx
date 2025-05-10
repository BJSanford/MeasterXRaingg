import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session) return <div>Please log in.</div>;
  if (!session.user?.verified)
    return <div>Your account is not verified. Please complete the verification process on Discord.</div>;

  return (
    <div>
      {/* ...existing dashboard code... */}
    </div>
  );
}
