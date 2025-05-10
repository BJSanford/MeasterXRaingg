import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // Rain.gg username is passed via OAuth 'state' param
      let rainUsername = null;
      if (account?.provider === "discord" && account?.state) {
        rainUsername = decodeURIComponent(account.state);
      }
      // fallback: try credentials or profile
      if (!rainUsername) {
        rainUsername =
          (credentials?.rainUsername) ||
          (typeof profile === "object" && "rainUsername" in profile ? profile.rainUsername : null) ||
          null;
      }

      if (!rainUsername) {
        return false;
      }

      // Store Discord info + Rain.gg username in UserVerification table
      await prisma.userVerification.upsert({
        where: { discordId: profile.id },
        update: { rainUsername, discordUsername: profile.username },
        create: {
          discordId: profile.id,
          discordUsername: profile.username,
          rainUsername,
          verified: false,
        },
      });

      return true;
    },
    async session({ session, token, user }) {
      // Attach verification status to session
      const dbUser = await prisma.userVerification.findUnique({
        where: { discordId: session.user.id },
      });

      if (dbUser) {
        session.user.verified = dbUser.verified;
        session.user.rainUsername = dbUser.rainUsername;
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
});