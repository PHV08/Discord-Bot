const { Client, Message, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const moment = require('moment');

module.exports = {
    name: 'anime',
    aliases: ['anime-search', 'search-anime'],
    description: 'Search details of anime',
    emoji: '<a:Peepo_WatchAnime:879957966797828187>',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const query = args.join(' ');
        if (!query) return message.reply('Please specify a title to search!');
        fetch(`https://api.jikan.moe/v3/search/anime?q=${query}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`An error occurred: ${res.status} ${res.statusText}`);
                }
                return res.json();
            })
            .then(body => {
                if (!body.results || body.results.length === 0) {
                    return message.reply('No anime found with that title.');
                }

                const maxResults = Math.min(body.results.length, 5); // Display up to 5 results
                const embeds = [];

                for (let i = 0; i < maxResults; i++) {
                    const result = body.results[i];
                    const title = result.title;
                    const mal_url = result.url;
                    const image = result.image_url;
                    const synopsis = result.synopsis;
                    const type = result.type;
                    const episode = result.episodes;
                    const score = result.score;
                    const start_date = result.start_date;
                    const rate = result.rated || 'Unknown';

                    const embed = new MessageEmbed()
                        .setTitle(title)
                        .setURL(mal_url)
                        .setThumbnail(image)
                        .setDescription(synopsis)
                        .addFields(
                            { name: 'Type', value: type },
                            { name: 'Total episode', value: `${episode}` },
                            { name: 'Ratings (on MAL)', value: `${score}` },
                            { name: 'Release date', value: `${moment(start_date).format('LLLL')}` },
                            { name: 'Rate', value: rate }
                        )
                        .setColor('#800080')
                        .setFooter({
                            text: `Requested by : ${message.author.tag}`,
                            iconURL: message.author.displayAvatarURL({ dynamic: true }),
                        });

                    embeds.push(embed);
                }

                message.channel.send({ embeds: embeds });
            })
            .catch(err => {
                const embedd = new MessageEmbed()
                    .setDescription(`:x: | An error occurred: ${err.message}`)
                    .setColor('RED');
                message.channel.send({ embeds: [embedd] });
                console.log(err);
            });
    },
};
