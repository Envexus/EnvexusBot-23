const { EmbedBuilder } = require("@discordjs/builders")
const fs = require('fs')

module.exports = {
    data: {
        name: "command-modal"
    },
    async execute(interaction, client) {

        const name = interaction.fields.getTextInputValue('command-name');
        const description = interaction.fields.getTextInputValue('command-description');

        const rn = interaction.fields.getTextInputValue('resource');
        const rl = interaction.fields.getTextInputValue('resource-link');
        const rd = interaction.fields.getTextInputValue('resource-description');

        const commandTemplate = `const { 
            SlashCommandBuilder,
            StringSelectMenuBuilder,
            ActionRowBuilder,
            StringSelectMenuOptionBuilder, 
            EmbedBuilder,
          } = require("discord.js");
        
          module.exports = {
            data: new SlashCommandBuilder()
              .setName("${name}")
              .setDescription("${description}"),
            async execute(interaction, client) {
              const embed = new EmbedBuilder()
              .setTitle("Linux Resource")
              .setDescription("${rd}")
              .addFields({ name: "${rn}", value: "[Link to Resource](${rl})"}, { name: "Author", value: "${interaction.user.username}" })

              interaction.reply({embeds: [embed]})
            },
          };`;

          const commandFilePath = `./commands/ticket/${name}.js`; // Path to save the command file
          fs.writeFile(commandFilePath, commandTemplate, (err) => {
            if (err) {
              console.error(err);
              interaction.reply('Error creating command.');
            } else {
              interaction.reply(`Command \`${name}\` created successfully!`);
            }
          });


    }
}