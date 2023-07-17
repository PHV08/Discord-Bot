const { CommandInteraction, Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'story',
    description: 'Story of PHV Bot',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        try {
            const prefix = process.env.PREFIX; // Get the custom prefix from the environment variable

            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('PHV Bot Story')
                .setDescription(
                    'This is not originally my code (technically it is). The project was initially named exxyll and was started by - gifaldyazkaa. However, the code had become outdated, prompting me (PHV) to completely recode the entire project. I have also added numerous additional features such as meme, welcome, ping, github, covid, etc. It has come to my attention that some individuals have accused me of simply stealing this code. I want to clarify that I have diligently rectified any errors, extensively updated the entire codebase (which took me days to accomplish), and made several significant improvements. Therefore, I kindly request that you refrain from making unfounded assumptions.'
                )
                .addField('Join Our Discord', '[Discord](https://discord.gg/UV22V6fEAv)', true)
                .addField('Follow PHV on GitHub', '[GitHub](https://github.com/PHV08)', true)
                .setFooter(`Thank you for using the story command!`);

            // Process the interaction response in a single location
            const processInteractionResponse = () => {
                interaction.reply({ embeds: [embed] })
                    .catch(error => {
                        console.error('Failed to send interaction response:', error);
                    });
            };

            // Add your other event listeners or middleware for interactions
            // ...

            // Call the function to send the interaction response
            processInteractionResponse();
        } catch (error) {
            console.error(error);
        }
    },
};
