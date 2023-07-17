const client = require('../../index');
const Levels = require('discord-xp');

client.on('messageCreate', async (message) => {
  const p = await client.prefix(message);
  if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(p)) return;

  const random = Math.floor(Math.random() * 34) + 1;
  const hasLevelledUp = await Levels.appendXp(message.author.id, message.guild.id, random);
  if (hasLevelledUp) {
    // const user = await Levels.fetch(message.author.id, message.guild.id);
    // message.channel.send(`Congratulations ${message.author}! You've leveled up to level ${user.level}.`);
  }

  const [cmd, ...args] = message.content.slice(p.length).trim().split(' ');

  let command = client.commands.get(cmd.toLowerCase()) || client.commands.get(client.aliases.get(cmd));
  if (!command) return;

  // Permission Handling
  const userperm = Array.isArray(command.userperm) ? command.userperm : [];
  const botperm = Array.isArray(command.botperm) ? command.botperm : [];

  const userHasPermission = userperm.every((perm) => message.member.permissions.has(perm));
  const botHasPermission = botperm.every((perm) => message.guild.me.permissions.has(perm));

  if (!userHasPermission) {
    return message.reply(`You need \`${userperm.join('`, `')}\` permissions to use this command.`);
  }

  if (!botHasPermission) {
    return message.reply(`I need \`${botperm.join('`, `')}\` permissions to execute this command.`);
  }

  await command.run(client, message, args);
});
