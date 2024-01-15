const fs = require("fs");
const { REST } = require(`@discordjs/rest`);
const { Routes } = require("discord-api-types/v9");

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync("./commands");
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArray } = client;
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
      }
    }

    const { commands, commandArray } = client;
    const clientId = "906065384510197761";
    const guildId = "818678340235952160";
    const rest = new REST({ version: "9" }).setToken(process.env.token);
    try {
      console.log(`Started refreshing application (/) commands!`);

      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: commandArray,
      });
      console.log(`Successfully reloaded application (/) commands!`);
    } catch (error) {
      console.log(error);
    }
  };
};
