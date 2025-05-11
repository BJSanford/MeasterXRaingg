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
        // Always add Discord ID and username to session.user
        if (session.user) {
          session.user.id = token.id;
          session.user.name = token.name;
          session.user.discordUsername = token.name; // Optional: alias for clarity
        }
        return session;
      } catch (err) {
        console.error("session error", err);
        return session;
      }
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.id = profile.id; // Discord user ID
        token.name = profile.username; // Discord username
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
});