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
    async signIn({ user, account, profile, email, credentials }) {
      try {
        // Get rainUsername from query or session
        const rainUsername =
          (credentials?.rainUsername) ||
          (typeof profile === "object" && "rainUsername" in profile ? profile.rainUsername : null) ||
          null;

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
      } catch (err) {
        console.error("signIn error", err);
        return false;
      }
    },
    async session({ session, token, user }) {
      try {
        const dbUser = await prisma.userVerification.findUnique({
          where: { discordId: session.user.id },
        });
        if (dbUser) {
          session.user.verified = dbUser.verified;
          session.user.rainUsername = dbUser.rainUsername;
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