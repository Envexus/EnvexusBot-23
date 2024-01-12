require("dotenv").config();
// Importing Important shit
const { token } = process.env;
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require(`fs`);


const client = new Client({ intents: 36359 });

client.commands = new Collection();
client.commandArray = [];
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();


const fucntionFolders = fs.readdirSync(`./functions`);
for (const folder of fucntionFolders) {
    const functionFiles = fs
      .readdirSync(`./functions/${folder}`)
      .filter((file) => file.endsWith(`.js`));
    for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.handleComponents();

client.login(token);