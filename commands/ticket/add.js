const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ActionRowBuilder,
  StringSelectMenuOptionBuilder,
  Colors,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add")
    .addUserOption((option) =>
      option
        .setName(`user`)
        .setRequired(true)
        .setDescription(`The user you would like to add to the ticket`)
    )
    .setDescription("Open a Ticket"),
  async execute(interaction, client) {
    const user = interaction.options.getUser("user");
    const added = await interaction.guild.members.fetch(user.id);

    setInteraction = interaction;

    if (interaction.channel.name.startsWith(`ticket-`)) {
      interaction.channel.permissionOverwrites.edit(added, {
        ViewChannel: true,
        SendMessages: true,
      });
      interaction.reply({
        content: `${user.id}`,
      });
    }

    const ticketLogEmbed = new EmbedBuilder()
      .setColor("Greyple")
      .setDescription(
        `
**User added to Ticket**
`
      )
      .addFields([
        {
          name: `🪪 Added By`,
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

function setInteraction() {
  return setInteraction;
}
