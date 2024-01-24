const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ActionRowBuilder,
  StringSelectMenuOptionBuilder,
  Colors,
  EmbedBuilder,
} = require("discord.js");
const profileDB = require(`../../schemas/profile`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("profile")
    .addUserOption((option) =>
      option
        .setName(`user`)
        .setRequired(true)
        .setDescription(`The Members profile you would like to view`)
    )
    .setDescription("View a Staff members Profile"),
  async execute(interaction, client) {
    const user = interaction.options.getUser("user");

    let profile = await profileDB.findOne({ UserID: user.id });

    if (!profile) {
      interaction.reply({
        content: "That user does not have a Profile. Please try again later",
      });
    } else {
      // Command Start
      const embed = new EmbedBuilder()
        .setAuthor({
          name: `${user.username}'s Profile`,
          iconURL: user.displayAvatarURL(),
        })
        .addFields(
          {
            name: "Punishments Given",
            value: profile.PunishmentsGiven.toString(),
            inline: true,
          },
          {
            name: "Tickets Handled",
            value: profile.TicketsHandled.toString(),
            inline: true,
          },
          {
            name: "Years of Service",
            value: profile.YearsOfService.toString(),
            inline: true,
          },
          {
            name: "Rank",
            value: "``" + profile.Rank.join("\n") + "``",
            inline: true,
          },
          { name: "Rating", value: profile.Rating, inline: true },
          { name: "???", value: "??", inline: true }
        );

      interaction.reply({ embeds: [embed] });
    }
  },
};
