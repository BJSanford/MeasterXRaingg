import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Navbar } from "@/components/navbar";
import "@/styles/globals.css";

export const metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions); // Fetch session on the server

  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Navbar session={session} /> {/* Pass session to Navbar */}
        {children}
      </body>
    </html>
  );
}
