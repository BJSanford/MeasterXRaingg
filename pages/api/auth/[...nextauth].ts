import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { prisma } from "@/lib/prisma";
import type { AuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";
import { serialize } from "cookie";

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
        token.name = profile.username; // Discord username
        token.sub = profile.id; // Discord user ID
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // Map token fields to session.user
      if (session.user) {
        session.user.id = token.sub as string; // Attach Discord user ID to session
        session.user.name = token.name as string; // Attach Discord username to session

        // Check UserVerification database for linked Rain.gg account
        const userVerification = await prisma.userVerification.findFirst({
          where: { discordId: token.sub },
        });

        if (userVerification) {
          // Set localStorage values for linked account
          session.user.rainUsername = userVerification.rainUsername;
          session.user.verified = true;
          session.user.rainId = userVerification.rainId;
        } else {
          session.user.verified = false;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // Redirect to the login page if not authenticated
    signOut: "/", // Redirect to the home page after signing out
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);