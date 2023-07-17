const { Client, Message, MessageEmbed, WebhookClient } = require('discord.js');

module.exports = {
    name: 'report',
    description: 'Report bugs or issues to the developers!',
    emoji: '❗',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        try {
            const wc = new WebhookClient({
                id: '1128672423403860060',
                token: 'TcXgpe_WtBG4CeuJ35VY7HNQbvnmRPEfiS48p-w-aJ_hmpPyK8oHX3vSUx4IB-RV2sew',
            });

            const query = args.join(' ');

            if (!query) {
                return message.reply('Please provide details about the bug or issue.');
            }

            const bugDetails = new MessageEmbed()
                .setTitle('New Bug Reported!')
                .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                .addFields(
                    { name: 'Bug Details', value: query },
                    {
                        name: 'Reported by',
                        value: `${message.author.tag} from **${message.member.guild.name}** (${message.author.id})`,
                    }
                )
                .setColor('#FF0000')
                .setTimestamp();

            wc.send({
                username: message.author.tag,
                avatarURL: message.author.displayAvatarURL({ dynamic: true, size: 1024 }),
                embeds: [bugDetails],
            });

            const supportServerLink = 'https://discord.gg/UV22V6fEAv';
            const thanksEmbed = new MessageEmbed()
                .setTitle('Thanks for reporting this bug!')
                .setDescription(
                    `Thank you for reporting the bug!\nYour report has been sent to the developers for review. Join our support server to know the status: [Support Server](${supportServerLink})`
                )
                .setColor('#FF0000')
                .setTimestamp();

            message.channel.send({ embeds: [thanksEmbed] });
        } catch (err) {
            console.error('Error in report command:', err);
            message.channel.send('An unexpected error occurred while processing the report. Please try again later.');
        }
    },
};
