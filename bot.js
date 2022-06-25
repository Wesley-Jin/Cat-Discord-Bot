// dotenv library which loads bot token into process.env in node modules
require('dotenv').config();

const querystring = require('querystring');
const r2 = require('r2');
const Discord = require("discord.js");
const client = new Discord.Client();

const BOT_PREFIX = "~";
const CAT_IMAGE_COMMAND = "cat"
const CAT_API_URL = "https://api.thecatapi.com/"
const CAT_API_KEY = "8edc1e84-ac62-454a-afad-c5a436316e65"

client.on("ready", () => {
    console.log("Ready to go!");
})

client.on("message", msg => {
    if (msg.content === `${BOT_PREFIX}${CAT_IMAGE_COMMAND}`) {
        msgReceived(msg);
        msg.react("💖")
        msg.react("🐱")
    }
})

client.on("message", msg => {
    if (msg.content === "~jacky") {
        customCatImage(msg);
        msg.react("💖")
        msg.react("😻")
    }
})

client.on('error', data => {
    console.log('error', data);
})

client.login(process.env.BOT_TOKEN);

async function msgReceived(msg) {
    try {
        var images = await getCatImage(msg.author.username);
        var image = images[0];
        var breed = image.breeds[0];

        console.log('message processed', 'displaying', breed);
        msg.channel.send("***"+ breed.name + "*** \r *"+ breed.temperament+"*", { files: [image.url] });
    } 
    catch(error) {
        console.log(error);
    }
}


async function getCatImage(sub_id) {
    var headers = {
        'X-API-KEY': CAT_API_KEY,
    }
    
    var query_params = {
        'has_breeds':true,
        'mime_types':'jpg,png',
        'size':'small',
        'sub_id': sub_id,
        'limit': 1
    }

    let queryString = querystring.stringify(query_params);

    try {
        let _url = CAT_API_URL + `v1/images/search?${queryString}`;
        var response = await r2.get(_url, {headers}).json
    }
    catch(error) {
        console.log(error);
    }
    return response;
}

    function customCatImage(msg) {
    const imageNumber = Math.floor(Math.random() * 17) + 1;
    var lastImage = 0;

    if(lastImage == imageNumber) {
        customCatImage(msg);
    }
    else {
        switch (true) {
            case (imageNumber === 1):
                msg.channel.send('https://i.imgur.com/He9oSkX.jpeg');
                lastImage = 1;
                break;
            case (imageNumber === 2):
                msg.channel.send('https://i.imgur.com/YbTdVby.jpeg');
                lastImage = 2;
                break;
            case (imageNumber === 3):
                msg.channel.send('https://i.imgur.com/3HcNFGy.jpeg');
                lastImage = 3;
                break;
            case (imageNumber === 4):
                msg.channel.send('https://i.imgur.com/Hd2yUty.jpeg');
                lastImage = 4;
                break;
            case (imageNumber === 5):
                msg.channel.send('https://i.imgur.com/FII02Ap.jpeg');
                lastImage = 5;
                break;
            case (imageNumber === 6):
                msg.channel.send('https://i.imgur.com/GcCmIPZ.jpeg');
                lastImage = 6;
                break;
            case (imageNumber === 7):
                msg.channel.send('https://i.imgur.com/I7tqrvj.jpeg');
                lastImage = 7;
                break;
            case (imageNumber === 8):
                msg.channel.send('https://i.imgur.com/QTtiq3q.jpeg');
                lastImage = 8;
                break;
            case (imageNumber === 9):
                msg.channel.send('https://i.imgur.com/im636M3.jpeg');
                lastImage = 9;
                break;
            case (imageNumber === 10):
                msg.channel.send('https://i.imgur.com/SqPSVXv.jpeg');
                lastImage = 10;
                break;
            case (imageNumber === 11):
                msg.channel.send('https://i.imgur.com/nF4j6vl.jpeg');
                lastImage = 11;
                break;
            case (imageNumber === 12):
                msg.channel.send('https://i.imgur.com/FmpwUVV.jpeg');
                lastImage = 12;
                break;
            case (imageNumber === 13):
                msg.channel.send('https://i.imgur.com/ynqrmk2.jpeg');
                lastImage = 13;
                break;
            case (imageNumber === 14):
                msg.channel.send('https://i.imgur.com/iNtlMDk.jpeg');
                lastImage = 14;
                break;
            case (imageNumber === 15):
                msg.channel.send('https://i.imgur.com/AGnGRUn.jpeg');
                lastImage = 15;
                break;
            case (imageNumber === 16):
                msg.channel.send('https://i.imgur.com/PB9eqBp.jpeg');
                lastImage = 16;
                break;
            case (imageNumber === 17):
                msg.channel.send('https://i.imgur.com/qkBoYZM.jpeg');
                lastImage = 17;
                break;
            case (imageNumber === 18):
                msg.channel.send('https://i.imgur.com/yFC1uD6.jpeg');
                lastImage = 18;
                break;
            default:
                msg.channel.send('Bad value, Wesley is dumb, yikes 🤡');
                break;
        }
    }
}

/*
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
    }*/
