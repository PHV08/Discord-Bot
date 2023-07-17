const { CommandInteraction, Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'nuke',
    description: 'Nuke current channel',
    userperm: 'SEND_MESSAGES',
    botperm: 'SEND_MESSAGES',
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const gifURL = 'https://media4.giphy.com/media/oe33xf3B50fsc/giphy.gif?cid=ecf05e47lyb3d99na2awftrb776qx7q1at4pimwshntvr0ex&ep=v1_gifs_search&rid=giphy.gif&ct=g';

        const embed = new MessageEmbed()
            .setImage(gifURL);

        interaction.reply({ embeds: [embed] });
    },
};
