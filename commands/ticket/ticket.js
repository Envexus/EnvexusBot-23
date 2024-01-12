const {
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  ActionRowBuilder,
  StringSelectMenuOptionBuilder,
  ButtonBuilder,
  EmbedBuilder,
  ButtonStyle
} = require("discord.js")
const { PermissionFlagsBits } = require("discord.js");
const ticket = require(`../../schemas/ticket`);

module.exports = {
  data: new SlashCommandBuilder()
  .setName("ticket")
  .setDescription("Create a new Ticket"),
  async execute(interaction, client) {
      const data = await ticket.findOne({ Guild: interaction.guild.id })
      let id = parseInt(data.ticketID); // Parse the ID as an integer

      const menu = new StringSelectMenuBuilder()
      .setCustomId(`ticket-menu`)
      .setMinValues(1)
      .setMaxValues(1)
      .setOptions(
        new StringSelectMenuOptionBuilder({
          label: `💵 Billing Support`,
          value: `billing`
        }),
        new StringSelectMenuOptionBuilder({
          label: `👋 General Support`,
          value: `support`
        }),
        new StringSelectMenuOptionBuilder({
          label: `📢 Reports`,
          value: `reports`
        }),
        new StringSelectMenuOptionBuilder({
          label: `📜 Applications`,
          value: `applications`
        })
      );

      interaction.guild.channels
      .create({
        name: `ticket-${id + 1}`, // Incremented parsed ID
        type: 0,
        parent: "1187447326759993496",
        permissionOverwrites: [
          {
            id: `${interaction.guild.id}`,
            deny: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.SendMessages,
            ],
          },
          {
            id: `${interaction.user.id}`,
            allow: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.SendMessages,
            ],
          },
          {
            id: `1187396555540529243`,
            allow: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.SendMessages,
            ],
          },
        ],
      })
      .then(async (Channel) => {
        interaction.reply({
          content: `Your ticket has been created <#${Channel.id}>`,
          ephemeral: false,
        });
        data.ticketID = id + 1; // Increment the parsed ID
        await data.save();
        Channel.send({
          content: `Please Select a Department`,
          components: [new ActionRowBuilder().addComponents(menu)],
        });
      });

  }
}
