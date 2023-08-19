const Schema = require('../Models/WelcomeChannel');
const { MessageEmbed } = require('discord.js');
const client = require('../../index');

client.on('guildMemberAdd', async (member) => {
  try {
    const data = await Schema.findOne({ Guild: member.guild.id });
    if (!data) return;

    const channel = member.guild.channels.cache.get(data.Channel);
    if (!channel) return;

    const userAvatar = member.user.displayAvatarURL({
      dynamic: true,
      size: 1024,
    });

    const welcomeMessage = new MessageEmbed()
      .setTitle(`Welcome to ${member.guild.name}!`)
      .setDescription(`<a:welcome:1142462881510735872> Hello <@${member.user.id}>, welcome to **${member.guild.name}**! <a:welcome:1142462881510735872>`)
      .setThumbnail(userAvatar)
      .addField('Member Information', `👤 User Tag: ${member.user.tag}\n🆔 User ID: ${member.user.id}`)
      .addField('Server Info', `📜 Server Name: ${member.guild.name}\n👥 Total members: ${member.guild.memberCount}`)
      .setImage('https://static.dribbble.com/users/27231/screenshots/2432051/welcome.gif')
      .setColor('BLUE')
      .setTimestamp();

    channel.send({ embeds: [welcomeMessage] });
  } catch (err) {
    console.error(err);
  }
});
