const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'channelDelete',
  /**
   * 
   * @param {Channel} channel
   */
  once: false,
  async execute(channel) {
    try {
      const auditLogs = await channel.guild.fetchAuditLogs({ type: 12 }); // 12 is the numeric value for CHANNEL_DELETE
      const entry = auditLogs.entries.first();

      const Log = new EmbedBuilder()
        .setColor('LuminousVividPink')
        .setTitle('Channel Deleted')
        .setDescription(`Type: \`\`${channel.type}\`\`\nName: ${channel.name}\nStaff: ${entry.executor.tag} (${entry.executor.username}).`)
        .setTimestamp();

      let logChannel = channel.guild.channels.cache.find(c => c.name === "channel-logs");
      logChannel.send({ embeds: [Log] });
    } catch (err) {
      console.error(err);
    }
  },
};
