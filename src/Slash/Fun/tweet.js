const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'nsfw',
    description: 'Show NSFW images',
    userperm: [],
    botperm: ['EMBED_LINKS'],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        try {
            const url = 'https://9gag.com/tag/18';

            const response = await fetch(url);
            const html = await response.text();

            // Extract image URLs from the HTML content
            const imageUrls = html.match(/https:\/\/img-9gag-fun.9cache.com\/photo\/\w+_\d+.(\w+)/g);

            if (!imageUrls || imageUrls.length === 0) {
                return interaction.reply('No NSFW images found at the moment.');
            }

            const randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];

            const embed = new MessageEmbed()
                .setColor('RED')
                .setTitle('NSFW Image')
                .setImage(randomImageUrl)
                .setFooter('Image from 9GAG NSFW');

            interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            interaction.reply('Failed to fetch NSFW images.');
        }
    },
};
