const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuOptionBuilder,
    Colors,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("claim")
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
      .setDescription("Claim a Ticket"),
    async execute(interaction, client) {

      if (interaction.channel.name.startsWith(`ticket-`)) {
        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setDescription(`${interaction.user.username} has claimed this ticket. They will now be the primary Support giver`)
        .setTimestamp();

        interaction.reply({ embeds: [embed]})
      } else {
        interaction.reply('This command can only be executed inside a Ticket')
      }
  
      const ticketLogEmbed = new EmbedBuilder()
        .setColor("Greyple")
        .setDescription(
          `**Ticket has been claimed**`
        )
        .addFields([
          {
            name: `🪪 Claimed By`,
            value: `${interaction.user.id} (${interaction.user.username})`,
          },
          {
            name: `Channel`,
            value: `<#${interaction.channel.id}>`,
          },
        ])
        .setTimestamp()
        .setThumbnail("https://i.imgur.com/K9mEu0h.png");
  
      interaction.guild.channels.cache
        .get("1187521890642841690")
        .send({ embeds: [ticketLogEmbed] });
    },
  };
  