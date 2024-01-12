const { EmbedBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits, Colors } = require("discord.js");

const { ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
module.exports = {
  data: {
    name: `ticket-menu`,
  },
  async execute(interaction, client) {
    const button = new ButtonBuilder()
    .setCustomId("close")
    .setLabel("🔒 Close")
    .setStyle(ButtonStyle.Danger);

    const option = interaction.values[0];
    var label = "";
    const actionRow1 = new ActionRowBuilder().addComponents(button);

    if (option === `billing`) {
      label = `Billing Support`;
    } else if (option === `support`) {
      label = `General Support`;
    } else if (option === `reports`) {
      label = `Reports`;
    } else if (option === `applications`) {
      label = `Applications`;
    }

    let embed = new EmbedBuilder() 
    .setDescription(
        `Thank you for contacting the Envexus Staff Team. Someone will attend to your ticket shortly. Please provide as much detail as you can so we can assist you faster!`
    )

    .addFields([
        {
            name: `🪪 User ID`,
            value: `${interaction.user.id} (${interaction.user.username})`
        },
        {
            name: `🎫 Department`,
            value: `${label}`
        },
        {
            name: `🟢 Status`,
            value: `Open`,
        },
    ]);

    interaction.message.delete()
    interaction.channel.send({
        embeds: [embed],
        content: `Ping`, // <@&977986400521707520>
        components: [actionRow1],
      });
    interaction.channel.setParent("1187447326759993496")

    interaction.channel.permissionOverwrites.set([
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
    ])


    const logEmbed = new EmbedBuilder()
    .setColor(Colors.Gold)
    .setDescription(`
    A new Ticket has been Submitted
    `)
    .addFields([
      {
          name: `🪪 User ID`,
          value: `${interaction.user.id} (${interaction.user.username})`
      },
      {
          name: `🎫 Department`,
          value: `${label}`
      },
      {
          name: `Channel`,
          value: `<#${interaction.channel.id}>`,
      },
  ])
  .setTimestamp()
  .setThumbnail('https://i.imgur.com/K9mEu0h.png')
  interaction.guild.channels.cache.get('1187521890642841690').send({ embeds: [logEmbed]})
  },
};