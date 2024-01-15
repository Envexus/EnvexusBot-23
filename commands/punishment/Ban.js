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
      .setName("ban")
      .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
      .addUserOption(option => option.setName("user").setDescription("The user you wish to ban").setRequired(true))
      .addStringOption(option => option.setName("reason").setDescription("The reason for banning the user").setRequired(false))
      .setDescription("Ban a User"),
    async execute(interaction, client) {

        // User Info
        const users = interaction.options.getUser('user');
        const ID = users.id;
        const banUser = client.users.cache.get(ID);

        if(interaction.user.id === ID) return await interaction.reply({ content: "You cant ban Yourself! Try again maybe with a cheating scumbag?"});

        let reason = interaction.options.getString('reason');
        if(!reason) reason = "No reason given!";

        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setDescription(`<:LUL:917905092450058290> ${banUser.tag} has been banned!`)
        .setImage('https://media.giphy.com/media/fe4dDMD2cAU5RfEaCU/giphy.gif')

        await interaction.guild.bans.create(banUser.id, {reason}).catch(err => {
            return interaction.reply({ content: "I cannot ban this user.."});
        })

        interaction.reply({ embeds: [embed]})

        const logEmbed = new EmbedBuilder()
        .setColor(Colors.Blurple)
        .setDescription(`
        **New User Banned!**
        `)
        .addFields([
          {
            name: `Banned By`,
            value: `${interaction.user.id} (${interaction.user.username})`
          },
          {
              name: `Banned User`,
              value: `${banUser.tag}`,
          },
          {
            name: `Reason`,
            value: `${reason}`
          }
      ])
      .setTimestamp()
      .setImage('https://media.giphy.com/media/fe4dDMD2cAU5RfEaCU/giphy.gif')
      interaction.guild.channels.cache.get('1196334187544854560').send({ embeds: [logEmbed]})

    }
  };