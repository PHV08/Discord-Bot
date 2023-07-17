const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILDS] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.channel.type === 'DM') {
        // Handle DM messages
        try {
            const response = 'Hi, thanks for reaching out!';
            await message.channel.send(response);
        } catch (error) {
            console.error(`Failed to send DM response: ${error}`);
        }
    }
});

client.login(process.env.TOKEN);




