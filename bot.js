// dotenv library which loads bot token into process.env in node modules
require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('Ready to go!');
})

client.login(process.env.BOT_TOKEN);