const {
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  ActionRowBuilder,
  EmbedBuilder,
  StringSelectMenuOptionBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const { applicationEmbed, builderEmbed } = require(`../../utils/embeds`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("application")
    .setDescription("View a Number of Formats")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addSubcommand((command) =>
      command.setName("staff").setDescription("Staff Application")
    )
    .addSubcommand((command) =>
      command.setName("builder").setDescription("Builder Application")
    ),

  async execute(interaction, client) {
    const sub = interaction.options.getSubcommand();

    switch (sub) {
      case "staff":
        interaction.reply({ embeds: [applicationEmbed] });
        break;
      case "builder":
        interaction.reply({ embeds: [builderEmbed] });
        break;
    }
  },
};
