const { Client, Intents } = require('discord.js');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
  if (message.channel.id === '1119870099692728416') {
    if (message.author.bot) return;
    if (!message.author.bot) {
      message.reply('Chat bot is under development');
    }
  }
});

(async () => {
  const token = process.env.TOKEN;
  client.login(token);
})();