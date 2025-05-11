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
    async session({ session, token, user }) {
      // Attach Discord user ID to session
      if (token && session.user) {
        session.user.id = token.sub; // or token.id, depending on your provider
      }

      try {
        // Attach verification status if available
        if (session.user && session.user.id) {
          const dbUser = await prisma.userVerification.findUnique({
            where: { discordId: session.user.id },
          });
          if (dbUser) {
            session.user.verified = dbUser.verified;
            session.user.rainUsername = dbUser.rainUsername;
          }
        }
        return session;
      } catch (err) {
        console.error("session error", err);
        return session;
      }
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
});