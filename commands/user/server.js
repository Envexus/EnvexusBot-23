const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    ActionRowBuilder,
    EmbedBuilder,
    StringSelectMenuOptionBuilder,
    Colors,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("whitelist")
      .addStringOption(option => option.setName("username").setDescription("Apply for whitelist on the Server").setRequired(false))
      .setDescription("Whitelist"),
    async execute(interaction, client) {

        // User Info
        let user = interaction.options.getString('username');

        const embed = new EmbedBuilder()
        .setColor(Colors.Blurple)
        .setDescription(`
        **New Whitelist Request!** \n<@${interaction.user.id}>:\nIGN: ${user}
        `)
      .setTimestamp()
      interaction.guild.channels.cache.get('1198651081622835372').send({ embeds: [embed]})

      interaction.reply('Application Sent')
    }
  };