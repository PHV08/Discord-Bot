const { Client, Collection } = require('discord.js');
const { DiscordTogether } = require('discord-together');
const fs = require('fs');
const prefixSchema = require('./src/Models/Prefix');
require('dotenv').config();

const client = new Client({
    intents: 32767,
});
module.exports = client;

require("replit-uptimer").config({
    port: 3000,
    path: "/",
    message: "Subscribe to Unknown PHV https://www.youtube.com/channel/UCGTbFucVXPA9OBTUPZj-TzQ. Please check out updates.md",
    debug: true,
});

// Append variables to client variable
client.commands = new Collection();
client.slashCommands = new Collection();
client.aliases = new Collection();
client.snipes = new Collection();
client.categories = fs.readdirSync('./src/Commands');
client.discordTogether = new DiscordTogether(client);
client.config = process.env;
client.prefix = async (message) => {
    try {
        let custom;
        const data = await prefixSchema.findOne({ Guild: message.guild.id }).catch((err) => console.log(err));

        if (data) {
            custom = data.Prefix;
        } else {
            custom = process.env.PREFIX;
        }
        return custom;
    } catch (err) {}
};

// Initialize project
require('./src/Handler')(client);

// Initialize levelling function
require('./src/Utility/Levelling');

// Connect to database
require('./src/Handler/Mongoose');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    const prefix = await client.prefix(message); // Get the prefix

    if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) {
        message.reply(`My prefix is \`${prefix}\``); // Respond with the prefix
    }

    // ... Rest of your message event code ...
    // Place your existing message event code or additional functionality here
    // Example:
    if (message.content.startsWith(`${prefix}ping`)) {
        // Handle ping command
        // Your existing code for the ping command
    }
});

client.login(process.env.TOKEN);
