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

    const supportServerLink = 'https://discord.gg/UV22V6fEAv';

    const welcomeMessage = new MessageEmbed()
      .setTitle('New member!')
      .setThumbnail(userAvatar)
      .setDescription(`Hello <@${member.user.id}>, welcome to **${member.guild.name}**!`)
      .addField('Support Server', `[Join our support server](${supportServerLink})`)
      .setImage('https://static.dribbble.com/users/27231/screenshots/2432051/welcome.gif')
      .setFooter(`Total members: ${member.guild.memberCount}`)
      .setColor('BLUE')
      .setTimestamp();

    channel.send({ embeds: [welcomeMessage] });
  } catch (err) {
    console.error(err);
  }
});
