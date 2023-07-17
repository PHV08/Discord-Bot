const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ownerinfo',
    description: 'Returns Information about PHV Owner',
    emoji: '👑',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const ownerId = '1066367509965574215'; // Replace with your owner's ID
        try {
            const owner = await client.users.fetch(ownerId);
            const embed1 = new MessageEmbed()
                .setTitle('👑 Owner Info')
                .setThumbnail(owner.displayAvatarURL({ dynamic: true }))
                .addFields(
                    { name: 'Name', value: owner.username },
                    { name: 'Discord tag', value: owner.tag },
                    { name: 'Working on', value: 'Bot development, YouTube, Discord Bots' },
                    {
                        name: 'Socials',
                        value: '[Website](https://linktr.ee/UNKNOWNPHV) | [GitHub](https://github.com/PHV08) | [YouTube](https://www.youtube.com/@phveditz/videos)',
                    },
                    { name: 'Discord', value: '[Join discord](https://discord.gg/UV22V6fEAv)' }
                )
                .setColor(owner.hexAccentColor || '#800080');
            message.channel.send({ embeds: [embed1] });
        } catch (error) {
            console.error('Error fetching owner:', error);
            message.channel.send('An error occurred while fetching owner information.');
        }
    },
};
