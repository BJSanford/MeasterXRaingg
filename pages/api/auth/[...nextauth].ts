import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { prisma } from "@/lib/prisma";

export default NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "identify", // Ensure the 'identify' scope is included
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.id = profile.id; // Discord user ID
        token.name = profile.username; // Discord username
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id; // Attach Discord user ID to session
        session.user.name = token.name; // Attach Discord username to session
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // Redirect to the login page if not authenticated
  },
  secret: process.env.NEXTAUTH_SECRET,
});