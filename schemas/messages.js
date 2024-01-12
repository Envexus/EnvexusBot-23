const { model, Schema } = require('mongoose');

let messages = new Schema({
    userId: String,
    messages: [
        {
            channelId: String,
            content: String,
            timestamp: { type: Date, default: Date.now }
        }
    ]
});

module.exports = model("messages", messages);
