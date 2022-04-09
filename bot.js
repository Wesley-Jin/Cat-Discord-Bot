// dotenv library which loads bot token into process.env in node modules
require('dotenv').config();

const Discord = require("discord.js");
const client = new Discord.Client();

const BOT_PREFIX = "~";
const CAT_IMAGE_COMMAND = "cat"

client.on("ready", () => {
    console.log("Ready to go!");
})

client.on("message", msg => {
    if (msg.content === `${BOT_PREFIX}${CAT_IMAGE_COMMAND}`) {
        catImage(msg);
        msg.react("💖")
        msg.react("🐱")
    }
})

function catImage(msg) {
    const imageNumber = Math.floor(Math.random() * 98) + 1;
    
    switch (true) {
        // wallpaperhouse URL 327005 has no image, added another image instead
        case (imageNumber === 5):
            msg.channel.send('Error link! Here\'s Doudou instead 💖');
            msg.channel.send('https://i.imgur.com/lMsc4re.png');
        case (imageNumber < 10):
            msg.channel.send(`https://wallpaper-house.com/data/out/9/wallpaper2you_32700${imageNumber}.jpg`);
            break;
        case (imageNumber <= 54):
            msg.channel.send(`https://wallpaper-house.com/data/out/9/wallpaper2you_3270${imageNumber}.jpg`);
            break;
        case (imageNumber <= 57):
            msg.channel.send('https://i.imgur.com/NOp9vG8.jpg');
            break;
        case (imageNumber <= 60):
            msg.channel.send('https://i.imgur.com/lMsc4re.png');
            break;
        case (imageNumber <= 63):
            msg.channel.send('https://i.imgur.com/F5UPvYa.jpg');
            break;
        case (imageNumber <= 66):
            msg.channel.send('https://i.imgur.com/EOcrkTO.jpg');
            break;    
        case (imageNumber <= 69):
            msg.channel.send('https://i.imgur.com/pJNqeZu.jpg');
            break;
        case (imageNumber <= 72):
            msg.channel.send('https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80');
            break;
        case (imageNumber <= 75):
            msg.channel.send('https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80');
            break;    
        case (imageNumber <= 78):
            msg.channel.send('https://images.unsplash.com/photo-1566847438217-76e82d383f84?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80');
            break;
        case (imageNumber <= 99):
            msg.channel.send(`https://wallpaper-house.com/data/out/9/wallpaper2you_3269${imageNumber}.jpg`);
            break;
        default:
            msg.channel.send('Bad value');
            break;
    }
}
client.login(process.env.BOT_TOKEN);