const { Client, Message, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'tweet',
    description: '(Under development)',
    aliases: ['twitter'],
    emoji: '🐦',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const developmentMessage = 'This command is currently under development.';

        message.reply(developmentMessage);
    },
};

       