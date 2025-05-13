require('dotenv').config();
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const axios_1 = __importDefault(require("axios"));
// Use environment variables for IDs and API URL
const GUILD_ID = process.env.GUILD_ID;
const MOD_ROLE_ID = process.env.MOD_ROLE_ID;
const API_BASE_URL = process.env.API_BASE_URL; // e.g. "https://your-backend-url.com"
if (!process.env.DISCORD_BOT_TOKEN || !GUILD_ID || !MOD_ROLE_ID || !API_BASE_URL) {
    console.error("Missing required environment variables. Please set DISCORD_BOT_TOKEN, GUILD_ID, MOD_ROLE_ID, and API_BASE_URL.");
    process.exit(1);
}
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.GuildMembers,
    ],
});
// Poll for pending verifications every 30 seconds
setInterval(async () => {
    try {
        const res = await axios_1.default.get(`${API_BASE_URL}/api/verification/pending`);
        const pendingUsers = res.data; // [{ discordId, discordUsername, rainUsername }]
        const guild = await client.guilds.fetch(GUILD_ID);

        for (const user of pendingUsers) {
            // Validate discordId and discordUsername
            if (!user.discordId || !user.discordUsername) {
                console.warn("Skipping user with invalid Discord data:", user);
                continue;
            }

            // Check if channel already exists
            const existing = guild.channels.cache.find(
                ch => ch.name === `verify-${user.discordUsername}` && ch.type === 0
            );
            if (existing) continue;

            // Fetch member
            const member = await guild.members.fetch(user.discordId).catch(() => null);
            if (!member) {
                console.warn("Skipping user because member could not be fetched:", user.discordId);
                continue;
            }

            // Create private channel
            const channel = await guild.channels.create({
                name: `verify-${user.discordUsername}`,
                type: 0, // GUILD_TEXT
                permissionOverwrites: [
                    { id: guild.roles.everyone, deny: [discord_js_1.PermissionsBitField.Flags.ViewChannel] },
                    { id: user.discordId, allow: [discord_js_1.PermissionsBitField.Flags.ViewChannel, discord_js_1.PermissionsBitField.Flags.SendMessages] },
                    { id: MOD_ROLE_ID, allow: [discord_js_1.PermissionsBitField.Flags.ViewChannel, discord_js_1.PermissionsBitField.Flags.SendMessages] },
                ],
            });

            channel.send(
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
        // Approve the user via the API
        await axios_1.default.post(`${API_BASE_URL}/api/verification/approve`, { discordId });

        // Notify the user
        message.channel.send(`<@${discordId}> has been verified!`);

        // Delete the verification channel
        if (message.channel.name.startsWith("verify-")) {
            await message.channel.delete();
        }
    } catch (err) {
        console.error("Error approving user:", err);
        message.channel.send("Failed to verify user. Please try again.");
    }
});
client.login(process.env.DISCORD_BOT_TOKEN);
