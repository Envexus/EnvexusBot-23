const { EmbedBuilder, Message, Embed } = require('discord.js');
const MessageModel = require('../../schemas/messages'); // Assuming you have a messages model

module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(message) {
        try {
            // Check if the user exists in the database
            let user = await MessageModel.findOne({ userId: message.author.id });

            if (!user) {
                // If the user doesn't exist, create a new document
                user = new MessageModel({
                    userId: message.author.id,
                    // Add other user-related properties if needed
                    messages: [], // Initialize the messages array
                });

                // Save the user document to the database
                await user.save();
            }

            // Now, create a new message document
            const newMessage = {
                userId: message.author.id,
                channelId: message.channel.id,
                content: message.content, // Include message content
                timestamp: message.createdTimestamp,
            };

            // Make sure the user has a messages array before trying to push
            user.messages = user.messages || [];

            // Add the new message to the user's messages array
            user.messages.push(newMessage);

            // Save the updated user document to the database
            await user.save();

            console.log("Message saved successfully:", newMessage);
        } catch (error) {
            console.error("Error saving message:", error);
        }
    },
};
