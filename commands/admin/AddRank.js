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
    .setName("addrank")
    .addUserOption((option) =>
      option
        .setName(`user`)
        .setRequired(true)
        .setDescription(`The Members profile you would like to add a rank to`)
    )
    .addStringOption((option) =>
      option
        .setName("rank")
        .setRequired(true)
        .setDescription(`The rank you would like to add`)
    )
    .setDescription("Add a Rank to a Staff Member"),
  async execute(interaction, client) {
    const user = interaction.options.getUser("user");
    const rank = interaction.options.getString("rank")

    let profile = await profileDB.findOne({ UserID: user.id });

    if (!profile) {
      interaction.reply(`This user does not have a Profile`);
    } else {

        profile.Rank.push(rank);
        await profile.save();

        interaction.reply('Rank added to User')

    }
  },
};
