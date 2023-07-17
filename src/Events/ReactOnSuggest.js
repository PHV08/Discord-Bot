const client = require('../../index');

const channel = '1127957311441342525';
client.on('messageCreate', message => {
    if (channel.includes(message.channel.id)) {
        if (message.author.bot) {
            message.react('👍');
            message.react('👎');
            message.react('🤷');
        }
        if (!message.author.bot) return;
    }
});
