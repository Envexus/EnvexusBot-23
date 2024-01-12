const { EmbedBuilder, Message, Embed } = require('discord.js')

module.exports = {
	name: 'messageDelete',
	/**
	 * 
	 * @param {Message} message
	 */
	once: false,
	execute(message, client) {

		const Log = new EmbedBuilder()
			.setColor("#4a66d4")
			.setFooter({text: `Logs - Message Deleted | ${message.author.tag}`, options: message.author.displayAvatarURL()}, true)
			.setTimestamp()
			.setTitle(`Message Deleted - (${message.author.tag})`)
			.setDescription(`🗑️ A [message](${message.url}) by ${message.author} was **Deleted** in ${message.channel}\n
			**Deleted Message**:\n  ${message.content ? message.content : "None"}`.slice(0, 4096))

            if(message.attachments.size >= 1) {
                Log.addField(`AttachmentsL`, `${message.attachments.map(a => a.url)}`, true)
            }

			let logChannel = message.guild.channels.cache.find(c => c.name === "message-logs")
			logChannel.send({embeds: [Log]}).catch((err) => {
                console.log(err)
            });

	},
};
