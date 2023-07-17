const { Client, Message, MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'roleinfo',
    description: 'Returns Role Information',
    aliases: ['roleinf'],
    emoji: '<:role:863214921574907915>',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        // Check days function
        function checkDays(date) {
            const now = new Date();
            const diff = now.getTime() - date.getTime();
            const days = Math.floor(diff / 86400000);
            return days + (days === 1 ? ' day' : ' days') + ' ago';
        }

        const mentionedRole =
            message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
        const guildIcon = message.guild.iconURL({ dynamic: true, size: 512 });

        if (!mentionedRole) return message.reply('Please mention or provide a valid role ID.');

        const embed = new MessageEmbed()
            .setTitle(`Role Information for ${mentionedRole.name}`)
            .setColor('#800080')
            .setThumbnail(guildIcon)
            .addFields(
                { name: 'Role ID', value: mentionedRole.id },
                { name: 'Role position', value: mentionedRole.rawPosition.toString() },
                { name: 'Role color', value: mentionedRole.hexColor },
                { name: 'Users', value: mentionedRole.members.size.toString() },
                { name: 'Tag-able', value: mentionedRole.mentionable ? 'Yes' : 'No' },
                { name: 'Hoist', value: mentionedRole.hoist ? 'True' : 'False' },
                {
                    name: 'Creation date',
                    value: `${moment(mentionedRole.createdAt).format('LLLL')} (${checkDays(mentionedRole.createdAt)})`,
                }
            )
            .setFooter(message.author.tag)
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    },
};
