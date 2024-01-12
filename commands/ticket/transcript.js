const {
    SlashCommandBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle, ChannelType
  } = require("discord.js");
  const { createTranscript } = require('discord-html-transcripts');
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("transcript")
      .setDescription("Creats a Transcript for the ticket"),
    async execute(interaction, client) {


        await interaction.reply({ content: "You transcript is being generated. This could take a while!"})

        const file = await createTranscript(interaction.channel, {
            returnBuffer: false,
            fileName: `${interaction.channel.name.toLowerCase()}-transcript.html`,
            poweredBy: false
        });

        let cache = interaction.guild.channels.cache.get("1187521890642841690")
        let msg = await cache.send({ files: [file]})

        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel(`Download`)
            .setURL(`${msg.attachments.first()?.url}`)
            .setStyle(ButtonStyle.Link),
        )

        const embed = new EmbedBuilder()
        .setColor("Green")
        .setDescription(`📦 Your transscript for ${interaction.channel}`)

        await interaction.editReply({ components:[button], embeds: [embed]})
    }
  };