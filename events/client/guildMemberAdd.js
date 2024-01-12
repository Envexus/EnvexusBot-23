const { Client, GuildMember, EmbedBuilder } = require("discord.js");

/**
 *
 * @param {GuildMember} member
 * 
 */
module.exports = {
  name: "guildMemberAdd",
  async execute(member) {


    if(member.bot) {

      const botEmbed = new EmbedBuilder()
      .setColor("Random")
      .setTitle('New Bot')
      .setDescription(`
      A new Bot (${member.user.tag}) has been added to ${member.guild.name}
      `)

    }
    const embed = new EmbedBuilder()
    .setColor("Random")
    .setTitle('New Member')
    .setDescription(`
    Welcome ${member.user.tag} to ${member.guild.name}
    You are the ${member.guild.size} Member to join this Discord
    `)

    member.roles.add("1187399503649714206")

    let logChannel = member.guild.channels.cache.find(c => c.name === "join")
    logChannel.send({embeds: [embed]}).catch((err) => {
        console.log(err)
    });

  },
};