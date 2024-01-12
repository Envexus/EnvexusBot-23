const { model, Schema } = require('mongoose');

let ticket = new Schema({
    Guild: String,
    ticketID: Number
})

module.exports = model("ticket", ticket)