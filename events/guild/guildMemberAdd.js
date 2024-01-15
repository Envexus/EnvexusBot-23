const { Client, GuildMember, EmbedBuilder } = require("discord.js");
const membersc = require('../../schemas/user'); // Import the MongoDB schema

/**
 *
 * @param {GuildMember} member
 */
module.exports = {
  name: "guildMemberAdd",
  async execute(member) {
    // Check if the member is a bot
    if (member.bot) {
      const botEmbed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle('New Bot')
        .setDescription(`A new Bot (${member.user.tag}) has been added to ${member.guild.name}`);
      // You might want to send the botEmbed to a specific channel or log it in some way.
    }

    // Fetch roles from the database based on the member's Discord ID
    const memberId = member.id;
    let dbMember = await membersc.findOne({ discordId: memberId });

    if (!dbMember) {
      // If the member doesn't exist in the database, create their schema with a default role
      dbMember = new membersc({
        discordId: memberId,
        roles: ["1187399503649714206"], // Replace "DEFAULT_ROLE_ID" with the actual default role ID
      });

      await dbMember.save();
    }

    // Add roles from the database to the member
    member.roles.add(dbMember.roles).catch((err) => {
      console.log(err);
    });

    const embed = new EmbedBuilder()
      .setColor("RANDOM")
      .setTitle('New Member')
      .setDescription(`
        Welcome ${member.user.tag} to ${member.guild.name}
        You are the ${member.guild.members.cache.filter(m => !m.user.bot).size} Member to join this Discord
      `);

    // Find the log channel by name
    let logChannel = member.guild.channels.cache.find(c => c.name === "join");
    
    // Send the welcome message to the log channel
    logChannel.send({ embeds: [embed] }).catch((err) => {
      console.log(err);
    });
  },
};
