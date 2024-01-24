const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    ActionRowBuilder,
    StringSelectMenuOptionBuilder,
    Colors,
    EmbedBuilder,
  } = require("discord.js");
  const db = require('../../schemas/profile');
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("create-profile")
      .addUserOption((option) =>
        option
          .setName(`user`)
          .setRequired(true)
          .setDescription(`The Members profile you would like to create`)
      )
      .setDescription("Create a Staff Members Profile"),
    async execute(interaction, client) {
      const user = interaction.options.getUser("user");

      let dbProfile = await db.findOne({ UserID: user.id});

      if(!dbProfile) {
        dbProfile = new db({
            UserID: user.id,
            Bio: 'N/A',
            TicketsHandled: 0,
            PunishmentsGiven: 0,
            YearsOfService: 0,
            Rank: ["Trial"],
            Rating: 0,
        });

        await dbProfile.save();
        interaction.reply('Successfully Created a Staff Profile for <@' + user.id + ">")
      } else {
        interaction.reply('User already has a Profile')
      }

    },
  };
  
  