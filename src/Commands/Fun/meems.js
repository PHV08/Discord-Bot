const { Client, Message, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'meme',
    description: 'Generate Random Memes From Reddit',
    aliases: [],
    emoji: '🤯',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES', 'EMBED_LINKS'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        try {
            const subredditUrl = 'https://www.reddit.com/r/memes/';
            const response = await fetch(subredditUrl + 'random/.json');
            const data = await response.json();

            const memePost = data[0]?.data?.children?.[0]?.data;

            if (memePost) {
                const embed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(memePost.title)
                    .setImage(memePost.url)
                    .setDescription(`Posted by: u/${memePost.author}`);

                message.channel.send({ embeds: [embed] });
            } else {
                message.reply('Oops! No memes were found.');
            }
        } catch (error) {
            console.error(error);
            message.reply('Oops! Something went wrong while fetching the meme.');
        }
    },
};
