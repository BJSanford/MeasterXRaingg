import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { prisma } from "@/lib/prisma";
import type { AuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";

export const authOptions: AuthOptions = {
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
    async jwt({ token, account, profile }: { token: JWT; account?: any; profile?: any }) {
      // Persist Discord username and ID in the token
      if (account && profile) {
        console.log("🔵 PROFILE RECEIVED FROM DISCORD:", profile);
        token.name = profile.username; // Discord username
        token.sub = profile.id; // Discord user ID
      }
      console.log("🔵 TOKEN AFTER JWT CALLBACK:", token);
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // Map token fields to session.user
      if (session.user) {
        session.user.id = token.sub as string; // Attach Discord user ID to session
        session.user.name = token.name as string; // Attach Discord username to session
      }
      console.log("🔵 SESSION AFTER SESSION CALLBACK:", session);
      return session;
    },
  },
  pages: {
    signIn: "/login", // Redirect to the login page if not authenticated
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);