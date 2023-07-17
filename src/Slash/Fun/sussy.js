const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
  name: 'sussy',
  description: 'Generates sussy baka emojis',
  aliases: [],
  userperm: 'SEND_MESSAGES',
  botperm: 'SEND_MESSAGES',
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    try {
      const response = await axios.get('https://emojidb.org/sus-emojis');
      const $ = cheerio.load(response.data);
      const emojis = [];

      $('h2:contains("Emojis")')
        .next('.emojis-list')
        .find('.emoji')
        .each((index, element) => {
          const emoji = $(element).text().trim();
          emojis.push(emoji);
        });

      const embed = new MessageEmbed()
        .setColor('#303136')
        .setDescription(emojis.join(''));

      if (!interaction.deferred && !interaction.replied) {
        await interaction.reply({ embeds: [embed] });
      }
    } catch (error) {
      console.error(`Error occurred while executing 'sussy' command: ${error}`);
      await interaction.reply({
        content: 'An error occurred while executing the command. Please try again later.',
        ephemeral: true // Only the user who triggered the command can see this error message
      });
    }
  },
};
