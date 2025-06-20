// bot.js (Final Optimized Version with Safe Member Fetch)
require('dotenv').config();
"use strict";

const {
    Client,
    GatewayIntentBits,
    PermissionsBitField,
    ChannelType,
    REST,
    Routes,
    SlashCommandBuilder
} = require("discord.js");
const axios = require("axios");
const express = require("express");

// Environment Variables
const GUILD_ID = process.env.GUILD_ID;
const MOD_ROLE_ID = process.env.MOD_ROLE_ID;
const API_BASE_URL = process.env.API_BASE_URL;
const OWNER_DISCORD_ID = "239127154275647489";

if (!process.env.DISCORD_BOT_TOKEN || !GUILD_ID || !MOD_ROLE_ID || !API_BASE_URL) {
    console.error("Missing required environment variables.");
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

const app = express();
app.use(express.json());

const activeVerifications = new Set();

client.once("ready", async () => {
    console.log(`Logged in as ${client.user?.tag}`);

    const commands = [
        new SlashCommandBuilder()
            .setName("approve")
            .setDescription("Approve a user")
            .addStringOption(opt =>
                opt.setName("discordid").setDescription("Discord user ID").setRequired(true)
            ),
        new SlashCommandBuilder()
            .setName("reject")
            .setDescription("Reject a user")
            .addStringOption(opt =>
                opt.setName("discordid").setDescription("Discord user ID").setRequired(true)
            ),
        new SlashCommandBuilder()
            .setName("close")
            .setDescription("Close the current channel"),
    ].map(cmd => cmd.toJSON());

    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);
    try {
        await rest.put(Routes.applicationGuildCommands(client.user.id, GUILD_ID), { body: commands });
        console.log("✅ Slash commands registered.");
    } catch (err) {
        console.error("Slash command registration failed:", err);
    }
});

setInterval(async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}/api/verification/pending`);
        const pendingUsers = res.data;
        const guild = client.guilds.cache.get(GUILD_ID);
        if (!guild) return;

        for (const user of pendingUsers) {
            if (!user.discordId || !user.discordUsername) continue;
            if (activeVerifications.has(user.discordId)) continue;

            const existing = guild.channels.cache.find(
                ch => ch.name === `verify-${user.discordUsername}` && ch.type === ChannelType.GuildText
            );
            if (existing) continue;

            let member = guild.members.cache.get(user.discordId);
            if (!member) {
                try {
                    member = await guild.members.fetch(user.discordId);
                } catch (err) {
                    console.error("Polling: Failed to fetch member:", err);
                    continue;
                }
            }

            const channel = await guild.channels.create({
                name: `verify-${user.discordUsername}`,
                type: ChannelType.GuildText,
                permissionOverwrites: [
                    { id: guild.roles.everyone.id, deny: [PermissionsBitField.Flags.ViewChannel] },
                    { id: user.discordId, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] },
                    { id: MOD_ROLE_ID, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] },
                ],
            }).catch(err => {
                console.error("Channel creation failed:", err);
            });

            if (!channel) continue;
            activeVerifications.add(user.discordId);

            channel.send(
                `Hello <@${user.discordId}>! Please provide a screenshot proving you own the Rain.gg account: **${user.rainUsername}**.\nA moderator will review your submission.`
            ).catch(() => {});
        }
    } catch (err) {
        console.error("Polling error:", err);
    }
}, 30000);

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;
    const member = interaction.member;
    const hasPermission =
        member.roles.cache.has(MOD_ROLE_ID) || interaction.user.id === OWNER_DISCORD_ID;

    if (!hasPermission) {
        await interaction.reply({ content: "❌ You do not have permission to use this command.", ephemeral: true });
        return;
    }

    if (commandName === "approve" || commandName === "reject") {
        const discordId = interaction.options.getString("discordid");
        const isApproval = commandName === "approve";

        try {
            if (isApproval) {
                const res = await axios.post(`${API_BASE_URL}/api/verification/approve`, { discordId });
                console.log("✅ Approved via slash:", res.data);
                await interaction.reply(`<@${discordId}> has been verified!`);
            } else {
                console.log("❌ Rejected:", discordId);
                await interaction.reply(`<@${discordId}> your verification was rejected.`);
            }

            activeVerifications.delete(discordId);

            if (interaction.channel.name.startsWith("verify-")) {
                await interaction.channel.delete();
            }
        } catch (err) {
            console.error("Slash command error:", err);
            await interaction.reply("❌ An error occurred while processing this command.");
        }
    }

    if (commandName === "close") {
        const channelName = interaction.channel.name;
        try {
            await interaction.reply(`🛑 Channel **${channelName}** is being closed.`);
            await interaction.channel.delete();
            console.log(`Slash close: ${channelName} deleted by ${interaction.user.tag}`);
        } catch (err) {
            console.error("Close failed:", err);
            await interaction.reply("❌ Failed to close this channel.");
        }
    }
});

app.post("/discord/rankRewardClaim", async (req, res) => {
    const { discordId, rainId, rainUsername, rewardAmount } = req.body;

    if (!discordId || !rainId || !rainUsername || !rewardAmount) {
        return res.status(400).json({ error: "Invalid request data" });
    }

    const guild = client.guilds.cache.get(GUILD_ID);
    if (!guild) {
        return res.status(500).json({ error: "Guild not cached" });
    }

    let member = guild.members.cache.get(discordId);
    if (!member) {
        try {
            member = await guild.members.fetch(discordId);
        } catch (err) {
            console.error("Error fetching member:", err);
            return res.status(400).json({ error: "Invalid Discord ID" });
        }
    }

    try {
        const modRole = guild.roles.cache.get(MOD_ROLE_ID);
        if (!modRole) throw new Error("MOD_ROLE_ID not found in guild");

        const channel = await guild.channels.create({
            name: `${member.user.username}-Rank-Reward`,
            type: ChannelType.GuildText,
            permissionOverwrites: [
                { id: guild.roles.everyone.id, deny: [PermissionsBitField.Flags.ViewChannel] },
                { id: member.id, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] },
                { id: modRole.id, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] },
            ],
        });

        await channel.send(
            `🎉 Congratulations <@${discordId}>! You have claimed a rank reward of **${rewardAmount} coins**.\nRain.gg ID: **${rainId}**.\nRain.gg Username: **${rainUsername}**.\nA moderator will assist you shortly.`
        );

        await channel.send(`<@${OWNER_DISCORD_ID}>, please assist with the reward distribution.`);
        res.status(200).json({ message: "Rank reward channel created successfully!" });
    } catch (err) {
        console.error("Error creating rank reward channel:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/discord/rakebackClaim", async (req, res) => {
    const { discordId, rainId, rainUsername, claimedWagered, claimedAmount } = req.body;

    if (!discordId || !rainId || !rainUsername || claimedWagered == null || claimedAmount == null) {
        return res.status(400).json({ error: "Invalid request data" });
    }

    const guild = client.guilds.cache.get(GUILD_ID);
    if (!guild) {
        return res.status(500).json({ error: "Guild not available" });
    }

    let member = guild.members.cache.get(discordId);
    if (!member) {
        try {
            member = await guild.members.fetch(discordId);
        } catch (err) {
            console.error("Error fetching member for rakeback claim:", err);
            return res.status(400).json({ error: "Invalid Discord ID" });
        }
    }

    try {
        // Create a dedicated channel for the rakeback claim
        const channel = await guild.channels.create({
            name: `${member.user.username}-Rakeback-Claim`,
            type: ChannelType.GuildText,
            permissionOverwrites: [
                { id: guild.roles.everyone.id, deny: [PermissionsBitField.Flags.ViewChannel] },
                { id: discordId, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] },
                { id: MOD_ROLE_ID, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] },
            ],
        });

        // Send message about rakeback claim
        await channel.send(
            `🤑 <@${discordId}> has claimed **${claimedAmount}** coins in rakeback for **${rainUsername}**! Total wagered logged: **${claimedWagered}**.`
        );

        return res.status(200).json({ message: "Rakeback claim sent to moderation channel." });
    } catch (err) {
        console.error("Error processing rakeback claim in Discord bot:", err);
        return res.status(500).json({ error: "Failed to post rakeback claim" });
    }
});

const PORT = process.env.PORT || 20161;
app.listen(PORT, () => {
    console.log(`HTTP server running on port ${PORT}`);
});

client.login(process.env.DISCORD_BOT_TOKEN);
