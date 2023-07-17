const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'invite',
    description: 'Invite me to your server',
    emoji: '➕',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 256 }))
            .setTitle('Invite me to your server!')
            .setDescription(
                `[Invite and authorize](https://discord.com/api/oauth2/authorize?client_id=1122193542140403800&permissions=8&scope=bot) | [YouTube](https://www.youtube.com/channel/UCGTbFucVXPA9OBTUPZj-TzQ) | [Join support server](https://discord.gg/UV22V6fEAv)\n\n[Developer](https://linktr.ee/UNKNOWNPHV)`
            )
            .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) });

        message.channel.send({ embeds: [embed] });
    },
};
