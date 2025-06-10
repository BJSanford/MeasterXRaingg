import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Navbar } from "@/components/navbar";
import { AuthProvider } from "@/lib/auth-context";
import "@/styles/globals.css";

export const metadata = {
  title: 'MeasterSkins',
  description: 'MeasterSkins is a rewards dashboard for Rain.gg users, allowing you to track your wagering, claim rakeback, and earn exclusive rewards by connecting your Rain.gg account and participating in community events.',
  generator: '',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions); // Fetch session on the server

  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Navbar session={session} /> {/* Pass session to Navbar */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
