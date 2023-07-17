require('dotenv').config();
const client = require('../../index');
const chalk = require('chalk');
const prefix = process.env.PREFIX;

const statuses = [
  { name: `${prefix}help | Live at 65 servers`, type: 'LISTENING' },
  { name: 'PHV COMMUNITY', type: 'WATCHING' },
  { name: 'Buy PHV NOW!!', type: 'PLAYING' },
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

  // Set a timer to change the status every 10 seconds (adjust as needed)
  setInterval(() => {
    statusIndex = (statusIndex + 1) % statuses.length;
    setStatus();
  }, 10000); // 10 seconds
});

function setStatus() {
  const { name, type } = statuses[statusIndex];
  client.user.setActivity(name, { type });
}
