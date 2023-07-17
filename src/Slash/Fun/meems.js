const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'meme',
    description: 'Generates random memes from Reddit',
    userperm: 'SEND_MESSAGES',
    botperm: 'SEND_MESSAGES',
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        try {
            const res = await fetch('');
            const meme = await res.json();

            if (!meme.title || !meme.url || !meme.image || !meme.upvotes || !meme.comments) {
                interaction.followUp('Failed to fetch a valid meme.');
                return;
            }

            const embed = new MessageEmbed()
                .setTitle(meme.title)
                .setURL(meme.url)
                .setColor('RANDOM')
                .setImage(meme.image)
                .setFooter(`👍 ${meme.upvotes} || 💬 ${meme.comments}`);

            interaction.followUp({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            interaction.followUp('An error occurred while fetching the meme.');
        }
    },
};
