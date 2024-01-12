const {
  SlashCommandBuilder,
  ChannelType,
  PermissionFlagsBits,
} = require("discord.js");
const ticket = require(`../../schemas/ticket`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((command) =>
      command
        .setName("tickets")
        .setDescription("Setup the Ticket System in Envexus")
        .addChannelOption((opt) =>
          opt
            .setName("category")
            .setDescription("The Category you would like to use for tickets")
            .addChannelTypes(ChannelType.GuildCategory)
            .setRequired(true)
        )
        .addChannelOption((opt) =>
          opt
            .setName("escelated")
            .setDescription(
              "The Category you would like to use for escelated Tickets"
            )
            .addChannelTypes(ChannelType.GuildCategory)
            .setRequired(true)
        )
        .addChannelOption((opt) =>
          opt
            .setName("waiting")
            .setDescription(
              "The Category you would like to use for pending Tickets"
            )
            .addChannelTypes(ChannelType.GuildCategory)
            .setRequired(true)
        )
    )
    .setDescription("Setup Parts of the Guild"),
  async execute(interaction, client) {
    const sub = interaction.options.getSubcommand();
    const data = await ticket.findOne({ Guild: interaction.guild.id });

    switch (sub) {
      case "tickets":
        if (data) {
          return await interaction.reply({
            content: "Tickets have already been set up in this Guild!",
          });
        } else {
          const tid = 0;
          await ticket.create({
            Guild: interaction.guild.id,
            ticketID: tid, // Changed 'tickedID' to 'ticketID'
          });

          interaction.reply({
            content: "Tickets have now been set up on this Guild!",
          });
        }
        break;
    }
  },
};
