require('dotenv').config();
"use strict";

const { Client, GatewayIntentBits, PermissionsBitField } = require("discord.js");
const axios = require("axios");

// Environment Variables
const GUILD_ID = process.env.GUILD_ID;
const MOD_ROLE_ID = process.env.MOD_ROLE_ID;
const API_BASE_URL = process.env.API_BASE_URL;

if (!process.env.DISCORD_BOT_TOKEN || !GUILD_ID || !MOD_ROLE_ID || !API_BASE_URL) {
    console.error("Missing required environment variables. Please set DISCORD_BOT_TOKEN, GUILD_ID, MOD_ROLE_ID, and API_BASE_URL.");
    process.exit(1);
}

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

// In-memory cache to prevent duplicate channels
const activeVerifications = new Set();

// Poll every 30 seconds
setInterval(async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}/api/verification/pending`);
        const pendingUsers = res.data; // [{ discordId, discordUsername, rainUsername }]
        const guild = await client.guilds.fetch(GUILD_ID);

        for (const user of pendingUsers) {
            if (!user.discordId || !user.discordUsername) continue;
            if (activeVerifications.has(user.discordId)) continue;

            const existing = guild.channels.cache.find(
                ch => ch.name === `verify-${user.discordUsername}` && ch.type === 0
            );
            if (existing) continue;

            const member = await guild.members.fetch(user.discordId).catch(() => null);
            if (!member) continue;

            const channel = await guild.channels.create({
                name: `verify-${user.discordUsername}`,
                type: 0, // GUILD_TEXT
                permissionOverwrites: [
                    { id: guild.roles.everyone, deny: [PermissionsBitField.Flags.ViewChannel] },
                    { id: user.discordId, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] },
                    { id: MOD_ROLE_ID, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] },
                ],
            });

            activeVerifications.add(user.discordId);

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

client.on("messageCreate", async (message) => {
    if (!message.content.startsWith("!approve") && !message.content.startsWith("!reject")) return;
    if (!message.member?.roles.cache.has(MOD_ROLE_ID)) return;

    const [command, discordId] = message.content.split(" ");
    if (!discordId) {
        message.reply(`Usage: ${command} <discordId>`);
        return;
    }

    const isApproval = command === "!approve";

    try {
        if (isApproval) {
            const res = await axios.post(`${API_BASE_URL}/api/verification/approve`, { discordId });
            console.log("✅ User approved via API:", res.data);
            message.channel.send(`<@${discordId}> has been verified!`);
        } else {
            console.log("❌ User rejected, not verifying:", discordId);
            message.channel.send(`<@${discordId}> your verification was rejected. If this was a mistake, please try again later.`);
        }

        activeVerifications.delete(discordId);

        if (message.channel.name.startsWith("verify-")) {
            await message.channel.delete();
        }
    } catch (err) {
        console.error(`Error during ${isApproval ? "approval" : "rejection"}:`, err);
        message.channel.send(`An error occurred while processing \`${command}\`. Please try again.`);
    }
});

client.on("rankRewardClaim", async (claimData) => {
    const { discordId, rainUsername, rewardAmount } = claimData;
    const guild = await client.guilds.fetch(GUILD_ID);

    try {
        const channel = await guild.channels.create({
            name: `${rainUsername}-Rank-Reward`,
            type: 0, // GUILD_TEXT
            permissionOverwrites: [
                { id: guild.roles.everyone, deny: [PermissionsBitField.Flags.ViewChannel] },
                { id: discordId, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] },
                { id: MOD_ROLE_ID, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] },
            ],
        });

        channel.send(
            `🎉 Congratulations <@${discordId}>! You have claimed a rank reward of **${rewardAmount}**.
Rain.gg Username: **${rainUsername}**.
A moderator will assist you shortly.`
        );

        // Ping specific Discord ID
        channel.send(`<@239127154275647489>, please assist with the reward distribution.`);
    } catch (err) {
        console.error("Error creating rank reward channel:", err);
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);
