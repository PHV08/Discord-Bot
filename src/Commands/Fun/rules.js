const { Client, Message, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: 'rules',
  description: 'Display the server rules.',
  aliases: ['server-rules'],
  emoji: '⚖️',
  userperm: ['SEND_MESSAGES'],
  botperm: ['SEND_MESSAGES'],

  run: async (client, message, args) => {
    // Define the server rules
    const rules = [
      '1. No spamming or flooding the chat with messages.',
      '2. No text walls or a large paragraphs of text. If you are venting we have a channel for that.',
      '3. No hate comments. Just respect everyone else, friendly arguments are ok.',
      '4. No adult (18+), explicit, graphic content including but not limited to images, text, nicknames, etc. outside of the designated NSFW room.',
      '5. No racist or degrading content (racial terms are allowed, but don\'t excessively use them).',
      '6. No excessively cursing. Swearing is obviously allowed but keep it chill.',
      '7. No advertising other sites/discord servers (Permission must be requested from a Staff member and must be shown upon request).',
      '8. Posting your own content such as videos or photos YOU have created is allowed, just don\'t use it as a form of self-promotion.',
      '9. No begging or repeatedly asking for help in the chat, just DM a staff member.',
      '10. No passing off someone else\'s content as your own. (As a content creator, I will personally ban you.)',
      '11. Inviting unofficial bots is NOT ALLOWED without administrative approval.',
      '12. Do not mention everyone without permission from a staff member.',
      '13. Do not perform or promote the intentional use of glitches, hacks, or bugs.',
      '14. Do not cause a nuisance in the community, repeated complaints from several members will lead to administrative action.',
      '15. Do not argue with staff. If you feel you have been wrongly treated, politely DM a staff member and ask for help.',
    ];

    // Create an embed to display the rules
    const rulesEmbed = new MessageEmbed()
      .setColor('#00FF00')
      .setTitle('Server Rules')
      .setDescription(rules.join('\n'))
      .setFooter('Operated By: PHV');

    // Send the embed to the channel where the command was invoked
    message.channel.send(rulesEmbed);
  },
};

       
