import { Client, GatewayIntentBits, PermissionsBitField, TextChannel } from "discord.js";
import axios from "axios";

// Replace with your actual IDs
const GUILD_ID = "1344800932122198068";
const MOD_ROLE_ID = "1353278415825801240";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

// Poll for pending verifications every 30 seconds
setInterval(async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/verification/pending");
    const pendingUsers = res.data; // [{ discordId, discordUsername, rainUsername }]
    const guild = await client.guilds.fetch(GUILD_ID);
    for (const user of pendingUsers) {
      // Check if channel already exists
      const existing = guild.channels.cache.find(
        ch => ch.name === `verify-${user.discordUsername}` && ch.type === 0
      );
      if (existing) continue;
      // Fetch member
      const member = await guild.members.fetch(user.discordId).catch(() => null);
      if (!member) continue;
      // Create private channel
      const channel = await guild.channels.create({
        name: `verify-${user.discordUsername}`,
        type: 0, // GUILD_TEXT
        permissionOverwrites: [
          { id: guild.roles.everyone, deny: [PermissionsBitField.Flags.ViewChannel] },
          { id: user.discordId, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] },
          { id: MOD_ROLE_ID, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] },
        ],
      });
      (channel as TextChannel).send(
        `Hello <@${user.discordId}>! Please provide a screenshot proving you own the Rain.gg account: **${user.rainUsername}**.\nA moderator will review your submission.`
      );
    }
  } catch (err) {
    console.error("Polling error:", err);
  }
}, 30000);

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

// Listen for mod approval (e.g., via !approve <discordId> command)
client.on("messageCreate", async (message) => {
  if (!message.content.startsWith("!approve")) return;
  if (!message.member?.roles.cache.has(MOD_ROLE_ID)) return; // Only mods
  const parts = message.content.split(" ");
  if (parts.length < 2) {
    message.reply("Usage: !approve <discordId>");
    return;
  }
  const discordId = parts[1];
  try {
    await axios.post("http://localhost:3000/api/verification/approve", { discordId });
    message.channel.send(`<@${discordId}> has been verified!`);
  } catch (err) {
    message.channel.send("Failed to verify user.");
  }
  // Optionally, archive or delete the channel
});

client.login(process.env.DISCORD_BOT_TOKEN);