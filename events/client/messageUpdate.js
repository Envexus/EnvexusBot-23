const { EmbedBuilder, Message } = require('discord.js')

module.exports = {
	name: 'messageUpdate',
	/**
	 * 
	 * @param {Message} oldMessage
	 * @param {Message} newMessage 
	 */
	once: false,
	execute(oldMessage, newMessage, client) {
		if(oldMessage.author.bot) return;

		if(oldMessage.content === newMessage.content) return;

		const count = 1950;
		const Original = oldMessage.content.slice(0, count) + (oldMessage.content.length > 1950 ? " ..." : "");
		const Edited = newMessage.content.slice(0, count) + (newMessage.content.length > 1950 ? " ..." : "");

		const Log = new EmbedBuilder()
			.setColor("#4a66d4")
			.setFooter({text: `Logs - Message Edited | ${newMessage.author.tag}`, options: newMessage.author.displayAvatarURL()}, true)
			.setTimestamp()
			.setTitle(`Message Updated (${newMessage.author.tag})`)
			.setDescription(`📝 A [message](${newMessage.url}) by ${newMessage.author} was **Edited** in ${newMessage.channel}\n
			**Original**:\n  ${Original} \n**Edited**:\n ${Edited}`)

			let logChannel = newMessage.guild.channels.cache.find(c => c.name === "message-logs")
			logChannel.send({embeds: [Log]}).catch((err) => {
                console.log(err)
            });

	},
};
