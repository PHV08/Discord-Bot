require('dotenv').config();
const client = require('../../index');
const chalk = require('chalk');
const prefix = process.env.PREFIX;

const statuses = [
  { name: `${prefix}help | Live at ${client.guilds.cache.size} servers`, type: 'STREAMING', url: 'https://twitch.tv/#' },
  { name: '100 Commands', type: 'STREAMING', url: 'https://twitch.tv/#' },
  { name: 'UNKNOWN PHV', type: 'STREAMING', url: 'https://twitch.tv/#' },
  // Add more statuses as needed
];

let statusIndex = 0;

client.on('ready', async () => {
  setStatus();

  console.log(
    `${chalk.grey.bold('[INFO]  ')}${chalk.blueBright.bold(client.user.tag)} ${chalk.white('is')} ${chalk.green.bold(
      'Online'
    )}`
  );

  // Change (optionally) the time.
  setInterval(() => {
    statusIndex = (statusIndex + 1) % statuses.length;
    setStatus();
  }, 10000); // 10 seconds
});

function setStatus() {
  const { name, type, url } = statuses[statusIndex];
  client.user.setActivity(name, { type, url });
}
