// dotenv library which loads bot token into process.env in node modules
require('dotenv').config();

// GPT3.5-turbo Chatbot code
const { Client, GatewayIntentBits } = require('discord.js');
const client2 = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})

const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
    organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

client2.on('messageCreate', async function (message) {
    try {
        if (message.author.bot) return;
        if (message.content.startsWith(">>")) {
            const gptResponse = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "Cat 🐈 is a friendly chatbot that only responds to messages beginning with >>." },
                    { role: "user", content: message.content.slice(2).trim() }
                ],
                temperature: 0.1,
                max_tokens: 200,
            });
            message.reply(`${gptResponse.data.choices[0].message.content}`);
            return;
        } else { return; }
    }
    catch (err) {
        console.log(err)
    }
});
client2.login(process.env.BOT_TOKEN);

// Cat Images code
const querystring = require('querystring');
const r2 = require('r2');
const Discord = require("discord.js");
const client = new Discord.Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const BOT_PREFIX = "~";
const CAT_IMAGE_COMMAND = "cat"
const CAT_API_URL = "https://api.thecatapi.com/"
const CAT_API_KEY = "8edc1e84-ac62-454a-afad-c5a436316e65"

const WESLEY_CAT = [
    "https://imgur.com/eX3mOqN",
    "https://imgur.com/z5GHOgy",
    "https://imgur.com/ViHzzpv",
    "https://imgur.com/AxTycG3",
    "https://imgur.com/Q3PgM7p",
    "https://imgur.com/ZZ2aHxT",
    "https://imgur.com/tCyMunH",
    "https://imgur.com/6roCwUT",
    "https://imgur.com/f4GyWr3",
    "https://imgur.com/c5XerA0",
    "https://imgur.com/QD18kfw",
    "https://imgur.com/NXGK5qV",
    "https://imgur.com/4NuG7Zl",
    "https://imgur.com/NOp9vG8",
    "https://imgur.com/lMsc4re",
    "https://imgur.com/F5UPvYa",
    "https://imgur.com/EOcrkTO",
    "https://imgur.com/pJNqeZu"
]

const JACKY_CAT = [
    "https://i.imgur.com/He9oSkX.jpeg",
    "https://i.imgur.com/YbTdVby.jpeg",
    "https://i.imgur.com/3HcNFGy.jpeg",
    "https://i.imgur.com/Hd2yUty.jpeg",
    "https://i.imgur.com/FII02Ap.jpeg",
    "https://i.imgur.com/GcCmIPZ.jpeg",
    "https://i.imgur.com/I7tqrvj.jpeg",
    "https://i.imgur.com/QTtiq3q.jpeg",
    "https://i.imgur.com/im636M3.jpeg",
    "https://i.imgur.com/SqPSVXv.jpeg",
    "https://i.imgur.com/nF4j6vl.jpeg",
    "https://i.imgur.com/FmpwUVV.jpeg",
    "https://i.imgur.com/ynqrmk2.jpeg",
    "https://i.imgur.com/iNtlMDk.jpeg",
    "https://i.imgur.com/AGnGRUn.jpeg",
    "https://i.imgur.com/PB9eqBp.jpeg",
    "https://i.imgur.com/qkBoYZM.jpeg",
    "https://i.imgur.com/yFC1uD6.jpeg"
]

const WINSTON_DOG = [
    "https://i.imgur.com/5ePfBtn.jpg",
    "https://i.imgur.com/jvArF5D.jpg",
    "https://i.imgur.com/E39Q7xJ.jpg",
    "https://i.imgur.com/fJXGcpF.jpg",
    "https://i.imgur.com/I8uGKo6.jpg",
    "https://i.imgur.com/kFH0QCB.jpg",
    "https://i.imgur.com/Dp1mAA0.jpg",
    "https://i.imgur.com/SKm6ENg.jpg",
    "https://i.imgur.com/Tiq19dc.jpg",
    "https://i.imgur.com/vccASG4.jpg",
    "https://i.imgur.com/wE7AOE4.jpg",
    "https://i.imgur.com/M7G8FrG.jpg",
    "https://i.imgur.com/AaeiL5h.jpg",
    "https://i.imgur.com/19QEfqA.jpg",
    "https://i.imgur.com/KnV2wIB.jpg",
    "https://i.imgur.com/Lclh5F3.jpg",
    "https://i.imgur.com/lbuZKYN.jpg",
    "https://i.imgur.com/Lf1vJ1o.jpg",
    "https://i.imgur.com/0e8tiXq.jpg"
]

client.on("message", msg => {
    if (msg.content === `${BOT_PREFIX}${CAT_IMAGE_COMMAND}`) {
        msgReceived(msg);
        msg.react("💖");
        msg.react("🐱");
    }
})

client.on("message", msg => {
    if (msg.content === "~doudou") {
        wesleyCat(msg);
        msg.react("💖");
        msg.react("😚");
    }
})

client.on("message", msg => {
    if (msg.content === "~jacky") {
        jackyCat(msg);
        msg.react("💖");
        msg.react("😻");
    }
})

client.on("message", msg => {
    if (msg.content === "~gazza") {
        winstonDog(msg);
        msg.react("💖");
        msg.react("🐶");
    }
})

client.on("message", msg => {
    if (msg.content === "~RUFF") {
        msg.channel.send("https://i.imgur.com/J16qGDr.png")
        msg.react("💖");
        msg.react("🤡");
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
        msg.channel.send("***" + breed.name + "*** \r *" + breed.temperament + "*", { files: [image.url] });
    }
    catch (error) {
        console.log(error);
    }
}


async function getCatImage(sub_id) {
    var headers = {
        'X-API-KEY': CAT_API_KEY,
    }

    var query_params = {
        'has_breeds': true,
        'mime_types': 'jpg,png',
        'size': 'small',
        'sub_id': sub_id,
        'limit': 1
    }

    let queryString = querystring.stringify(query_params);

    try {
        let _url = CAT_API_URL + `v1/images/search?${queryString}`;
        var response = await r2.get(_url, { headers }).json
    }
    catch (error) {
        console.log(error);
    }
    return response;
}

let lastWesleyImage;

function wesleyCat(msg) {
    let imageNumber = Math.floor(Math.random() * WESLEY_CAT.length);
    while (imageNumber === lastWesleyImage) {
        imageNumber = Math.floor(Math.random() * WESLEY_CAT.length);
    }
    msg.channel.send(WESLEY_CAT[imageNumber]);
    lastWesleyImage = imageNumber;
}

let lastJackyImage;

function jackyCat(msg) {
    let imageNumber = Math.floor(Math.random() * JACKY_CAT.length);
    while (imageNumber === lastJackyImage) {
        imageNumber = Math.floor(Math.random() * JACKY_CAT.length);
    }
    msg.channel.send(JACKY_CAT[imageNumber]);
    lastJackyImage = imageNumber;
}

let lastWinstonImage;

function winstonDog(msg) {
    let imageNumber = Math.floor(Math.random() * WINSTON_DOG.length);
    while (imageNumber === lastWinstonImage) {
        imageNumber = Math.floor(Math.random() * WINSTON_DOG.length);
    }
    msg.channel.send(WINSTON_DOG[imageNumber]);
    lastWinstonImage = imageNumber;
}
