const { Client, Message, MessageEmbed, WebhookClient } = require('discord.js');

module.exports = {
    name: 'suggest',
    description: 'Suggest a feature or something to the developers.',
    emoji: '❔',
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
                id: '1127959943492931605',
                token: 'ez2pQHM8JI0WPnZpaaVtOGiGVIby2cB-K_V1IKQH6KwSnKevffpdsg4CF_D-rGQfh-Gs',
            });
            const query = args.join(' ');
            const logChannel = client.channels.cache.get('1127957311441342525');

            if (!query) return message.reply({ content: `Please specify a suggestion!` });

            const suggestEmbed = new MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .addFields(
                    { name: 'Suggestion', value: `${query}` },
                    { name: 'Sent from', value: `${message.member.guild.name}` }
                )
                .setColor('BLUE')
                .setTimestamp();

            wc.send({
                username: message.author.tag,
                avatarURL: message.author.displayAvatarURL({ dynamic: true, size: 1024 }),
                embeds: [suggestEmbed],
            });

            const sankyuu = new MessageEmbed()
                .setTitle(`:white_check_mark: Thanks for your suggestion!`)
                .setDescription(
                    `Hey <@${message.author.id}>, thanks for your suggestion!\nYour suggestion has been sent to [**PHV Development**](https://discord.gg/UV22V6fEAv) in <#1127957311441342525>.`
                )
                .setColor('#00FF00')
                .setTimestamp();

            const log = new MessageEmbed()
                .setTitle(`New Suggestion`)
                .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
                .setDescription(
                    `New suggestion from [${message.author.tag}](https://discord.com/users/${message.author.id})!`
                )
                .addFields(
                    { name: 'User ID', value: `${message.author.id}` },
                    { name: 'Sent from', value: `${message.member.guild.name}` }
                )
                .setColor('#00FF00')
                .setTimestamp();

            if (logChannel) {
                logChannel.send({ embeds: [log] })
                    .catch(error => {
                        console.error('Error sending log message:', error);
                    });
            } else {
                console.error('logChannel is undefined or not found.');
            }

            message.channel.send({ embeds: [sankyuu] });
        } catch (err) {
            console.error('Error in suggest command:', err);
            message.channel.send({
                content: 'Oops! An unexpected error occurred while processing the suggestion. Please try again later.',
            });
        }
    },
};
