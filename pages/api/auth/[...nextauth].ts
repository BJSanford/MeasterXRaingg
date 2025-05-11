import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { prisma } from "@/lib/prisma";

export default NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Allow all Discord logins
      return true;
    },
    async session({ session, token }) {
      // Attach Discord ID and username to the session
      if (session.user) {
        session.user.id = token.id; // Discord user ID
        session.user.name = token.name; // Discord username
      }
      console.log("Session data:", session); // Debugging
      return session;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.id = profile.id; // Discord user ID
        token.name = profile.username; // Discord username
      }
      console.log("JWT token data:", token); // Debugging
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
});