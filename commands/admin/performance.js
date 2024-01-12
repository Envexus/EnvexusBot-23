const {
    SlashCommandBuilder,
    ChannelType,
    PermissionFlagsBits,
    EmbedBuilder,
  } = require("discord.js");
  const ticket = require(`../../schemas/ticket`);
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("performance")
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
      .addUserOption((option) =>
      option
        .setName(`user`)
        .setRequired(true)
        .setDescription(`User`)
    )
      .setDescription("Setup Parts of the Guild"),
    async execute(interaction, client) {

        const user = interaction.options.getUser("user");

        const embed = new EmbedBuilder()
        .setTimestamp()
        .setDescription(`
        Hey!

        Welcome ${user} to your Perfoemance channel! This is a private channel for you to discuss stuff with upper Management. You can use this for any issue big or Small

        You can also post
        - Absence from your Postion\n
        - Reports about other Staff\n
        - Anything else

        Thanks
        Envexus Management
        `)
        .setColor('LuminousVividPink')
        interaction.deferReply();
        interaction.deleteReply();
        interaction.channel.send({ embeds: [embed]})

    },
  };
  